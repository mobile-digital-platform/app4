import React,{Component} from 'react';
import {Alert,Keyboard,Platform,StyleSheet,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon				from 'react-native-vector-icons/EvilIcons';

import AnimatedButton	from '../../../templates/animated_button';
import Input			from '../../../templates/input';
import InputPhone		from '../../../templates/input_phone';
import SubTitle			from '../../../templates/subtitle';

import alert			from '../../../services/alert';
import st				from '../../../services/storage';

import {request as promo_request}		from '../../../redux/reducers/promo';
import {request as settings_request}	from '../../../redux/reducers/settings';

const styles = StyleSheet.create({
	main: {
		padding: 20,
	},
	main_text: {
		marginBottom: 20, marginHorizontal: 20,
		color: '#111',
		fontSize: 16, fontFamily: 'GothamPro',
		lineHeight: 18,
		textAlign: 'center',
	},
	main_input: {
		// paddingVertical: 10,
	},
	button: {
		marginVertical: 10, padding: 15,
		borderRadius: 40,
		backgroundColor: '#f40000',
	},
	button_text: {
		paddingTop: Platform.select({ios:3,android:0}),
		color: '#fff',
		fontSize: 20, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
	},
	button_disabled: {
		marginVertical: 10, padding: 15,
		borderRadius: 100,
		backgroundColor: '#f1f1f1',
	},
	button_disabled_text: {
		color: '#d5d5d5',
		fontSize: 20, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
	},
	reset: {
		paddingVertical: 20, paddingHorizontal: 40,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},
	reset_wait: {
		paddingVertical: 10,
		color: '#f40000',
	},
	reset_wait_hide: {
		color: 'transparent',
	},
	reset_button: {
		marginVertical: 20, padding: 15,
		borderWidth: 1, borderColor: '#f40000',
		borderRadius: 40,
	},
	reset_button_text: {
		paddingTop: Platform.select({ios:3,android:0}),
		color: '#f40000',
		fontSize: 18, fontFamily: 'GothamPro',
		textAlign: 'center',
	},
});

export default withNavigation(class Authorization extends Component {
	constructor(props) {
		super(props);

		this.timeout;

		this.state = {
			phone: '',
			phone_error: false,
			password: '',
			password_error: false,
			ready: false,
			code: '',
			timeout: 0,
			state: 'starting',
			enter_state: 'initial',
		};
	}

	componentDidMount() {
	}
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	// Секундомер
	timer = async (time) => {
		await this.setState({timeout:time});
		if(this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(_ => {
			if(this.state.timeout>1)	this.timer(this.state.timeout-1);
			else 						this.setState({state:'expired'});
		},1000);
	}

	// Изменение вводимых данных
	update = async (state_adjust) => {
		await this.setState(state_adjust);

		// Убираем показ ошибок, если они исправлены
		if(this.state.phone.length		&& this.state.phone_error)		this.setState({phone_error:''});
		if(this.state.password.length	&& this.state.password_error)	this.setState({password_error:''});

		if(this.state.phone.length && this.state.password.length)		this.setState({ready:true});
	}

	// Запрос пароля
	ask_password = async () => {
		if(!this.state.phone.length) {
			alert("Введите номер телефона");
			return;
		}

		if(['starting','expired'].indexOf(this.state.state)>=0) {
			// Ставим таймер, чтоб заново запросить нельзя было
			this.timer(60);

			// Запрашиваем код
			this.props.open_smoke();
			let {response,error} = await settings_request.phone_send_password(this.state.phone);
			if(response) {
				console.log(response);
				await alert(response.code);
			}
			if(error) {
				await alert('Невозможно восстановить пароль','Проверьте правильность ввода номера телефона');
			}
			this.props.close_smoke();
		}
	}

	// Вход
	enter = async () => {
		// Проверяем ввод
		if(!this.state.phone.length) {
			// alert("Введите номер телефона!");
			this.setState({phone_error:'Введите номер телефона'});
			return;
		} else if(!this.state.password.length) {
			// alert("Введите пароль!");
			this.setState({password_error:'Введите пароль'});
			return;
		} else if(this.state.phone_error.length || this.state.password_error.length) {
			return;
		}

		Keyboard.dismiss();
		this.props.open_smoke();

		// Получаем номер
		let authorize = await settings_request.authorize({phone:this.state.phone,password:this.state.password});
		if(authorize.response) {
			this.props.log_out();

			// Получаем данные
			let user_data = await settings_request.get(authorize.response.user_id);
			if(user_data.response) {

				// Сохраняем
				this.props.update_user(user_data.response);

				// В асинхронное хранилище изменения тоже записываем
				st.merge('user',user_data.response);

				await this.get_promo_list(user_data.response);

				this.props.navigation.goBack();
			}
			if(user_data.error) {
				await alert(user_data.error.message);
			}
		}
		if(authorize.error) {
			await alert(authorize.error.message);
		}
		this.props.close_smoke();
	}

	// Загрузка данных об акциях
	get_promo_list = async (user) => {
		console.log(user);
		let data = await promo_request.get_list({user_id:user.id});
		if(data.response) {
			let items = data.response.items;
			let waiting = [];

			for(let i=0; i<items.length; i++) {
				let row = items[i];

				// Набираем по всем акциям уточнения внутри торговых сетей
				waiting.push(new Promise(async (resolve,reject) => {
					let retailers_data = await promo_request.get_promo_retailers({promo_id:row.id,user_id:user.id});
					if(retailers_data.response) {
						items[i].promo_list = retailers_data.response.items.map(e =>({
							...e,
							retailer: this.props.promo.retailer_list.find(g => g.id==e.retailer_id),
						}));
					}
					if(retailers_data.error) {
						this.setState({promo:'failed'});
					}
					resolve()
				}));
			}
			await Promise.all(waiting);

			this.props.set_promo_list(items);

			let my_items = [];
			for(let i=0; i<items.length; i++) {
				let row = items[i];
				for(let j=0; j<row.promo_list.length; j++) {
					let nrow = row.promo_list[j];
					if(nrow.participation) {
						nrow.image_url = row.image_url;
						my_items.push(nrow);
					}
				}
			}
			this.props.set_my_promo_list(my_items);

			return true;
		}
		if(data.error) {
			return false;
		}
	}

	render() {
		let state = this.state;

		return (
			<ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
				<View style={styles.main}>
					<Text style={styles.main_text}>Для авторизации введите номер телефона и пароль, указанные при регистрации.</Text>
					<View style={styles.main_input}>
						<InputPhone
							title="Мобильный телефон"
							value={state.phone}
							error={state.phone_error}
							update={phone => this.update({phone})}
						/>
					</View>
					<View style={styles.main_input}>
						<Input
							title="Пароль"
							value={state.password}
							type="numeric"
							error={state.password_error}
							update={password => this.update({password})}
						/>
					</View>
					<AnimatedButton active={state.ready} state={state.enter_state} onPress={this.enter}>Войти</AnimatedButton>
				</View>
				<View style={styles.reset}>
					<SubTitle text="Я забыл пароль" />
					{this.state.state != 'starting' ? (
						<Text style={[styles.reset_wait,this.state.state=='expired' ? styles.reset_wait_hide : {}]}>
							Отправить код повторно можно через {this.state.timeout} сек.
						</Text>
					) : null}
					<TouchableOpacity style={styles.reset_button} onPress={this.ask_password}>
						<Text style={styles.reset_button_text}>Восстановить пароль</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
});
