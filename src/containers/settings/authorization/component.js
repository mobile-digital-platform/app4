import React,{Component} from 'react';
import {Keyboard,Platform,StyleSheet,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import AnimatedButton	from '../../../templates/animated_button';
import Input			from '../../../templates/input';
import InputPhone		from '../../../templates/input_phone';
import SubTitle			from '../../../templates/subtitle';

import alert			from '../../../services/alert';
import st				from '../../../services/storage';
import push				from '../../../services/push_notification';

import get_promo		from '../../../services/get_promo';

import {request as settings_request}	from '../../../redux/reducers/settings';

const styles = EStyleSheet.create({
	main: {
		padding: 20,
	},
	main_text: {
		marginBottom: 15, marginHorizontal: 20,
		color: '#111',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
		textAlign: 'center',
	},
	main_input: {
	},
	main_button: {
		marginVertical: 10,
	},
	reset: {
		paddingVertical: 10, paddingHorizontal: 40,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},
	reset_wait: {
		paddingVertical: 10,
		color: '$red',
	},
	reset_wait_hide: {
		color: 'transparent',
	},
	reset_button: {
		marginVertical: 20, padding: 15,
		borderWidth: 1, borderColor: '$red',
		borderRadius: 40,
	},
	reset_button_text: {
		color: '$red',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
	},
});

export default withNavigation(class Authorization extends Component {
	constructor(props) {
		super(props);

		this.timeout;

		this.state = {
			waiting: false,
			ready: false,

			timeout: 0,
			state: 'starting',

			phone: '+7',
			phone_error: false,
			password: '',
			password_error: false,

			button_state: 'ready',
			result: false,
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
		let state = this.state;

		// Проверяем ввод
		if(!state.phone.length) {
			// alert("Введите номер телефона!");
			this.setState({phone_error:'Введите номер телефона'});
			return;
		} else if(!state.password.length) {
			// alert("Введите пароль!");
			this.setState({password_error:'Введите пароль'});
			return;
		} else if(state.phone_error.length || state.password_error.length) {
			return;
		}

		Keyboard.dismiss();
		if(state.waiting) return;

		this.setState({waiting:true,button_state:'waiting'});
		// this.props.open_smoke();

		// Получаем номер
		let authorize = await settings_request.authorize({phone:state.phone,password:state.password});
		if(authorize.response) {
			this.props.log_out();

			// Получаем данные
			let user_data = await settings_request.get(authorize.response.user_id);
			if(user_data.response) {

				// Запрашиваем токен уведомлений
				let data = {...user_data.response};
				// data.push_token = await push.request_async();

				// Сохраняем
				this.props.update_user(data);

				// В асинхронное хранилище изменения тоже записываем
				st.merge('user',data);

				await this.get_promo_list(data.id);
				this.setState({button_state:'end',result:true});
			}
			if(user_data.error) {
				this.setState({button_state:'ready',result:false});
				await alert(user_data.error.message);
			}
		}
		if(authorize.error) {
			this.setState({button_state:'ready',result:false});
			await alert(authorize.error.message);
		}
		this.setState({waiting:false});
		// this.props.close_smoke();
	}

	// Загрузка данных об акциях
	get_promo_list = async (user_id) => {
		let res = await get_promo({user_id,retailer_list:this.props.promo.retailer_list});
		if(res) {
			this.props.set_promo_list(res.items);
			this.props.set_my_promo_list(res.my_items);
		}
	}

	back = () => {
		if(this.state.result) this.props.navigation.goBack();
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
					<AnimatedButton
						style={{container:styles.main_button}}
						active={state.ready}
						state={state.button_state}
						on_press={this.enter}
						on_end={this.back}
					>
						Войти
					</AnimatedButton>
				</View>
				<View style={styles.reset}>
					<SubTitle style={{marginTop:20}} text="Я забыл пароль" />
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
