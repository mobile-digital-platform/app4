import React,{Component} from 'react';
import {Alert,Keyboard,StyleSheet,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon			from 'react-native-vector-icons/EvilIcons';

import Input		from '../../../templates/input';
import InputPhone	from '../../../templates/input_phone';
import SubTitle		from '../../../templates/subtitle';

import alert		from '../../../services/alert';
import st			from '../../../services/storage';

import {request}	from '../../../redux/reducers/settings';

const styles = StyleSheet.create({
	main: {
		padding: 20,
	},
	main_text: {
		marginBottom: 20, marginHorizontal: 20,
		color: '#111',
		fontSize: 16,
		textAlign: 'center',
	},
	main_input: {
		// paddingVertical: 10,
	},
	button: {
		marginVertical: 10, padding: 15,
		borderRadius: 40,
		backgroundColor: 'red',
	},
	button_text: {
		color: '#fff',
		fontSize: 20, fontWeight: 'bold',
		textAlign: 'center',
	},
	button_disabled: {
		marginVertical: 10, padding: 15,
		borderRadius: 100,
		backgroundColor: '#f1f1f1',
	},
	button_disabled_text: {
		color: '#d5d5d5',
		fontSize: 20,
		textAlign: 'center',
	},
	reset: {
		paddingVertical: 20, paddingHorizontal: 40,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},
	reset_wait: {
		paddingVertical: 10,
		color: 'red',
	},
	reset_wait_hide: {
		color: 'transparent',
	},
	reset_button: {
		marginVertical: 20, padding: 15,
		borderWidth: 1, borderColor: 'red',
		borderRadius: 40,
	},
	reset_button_text: {
		color: 'red',
		fontSize: 20,
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
		};
	}

	componentDidMount() {
	}
	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	timer = async (time) => {
		await this.setState({timeout:time});
		if(this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(_ => {
			if(this.state.timeout>1)	this.timer(this.state.timeout-1);
			else 						this.setState({state:'expired'});
		},1000);
	}

	update = async (state_adjust) => {
		await this.setState(state_adjust);

		// Убираем показ ошибок, если они исправлены
		if(this.state.phone.length		&& this.state.phone_error)		this.setState({phone_error:''});
		if(this.state.password.length	&& this.state.password_error)	this.setState({password_error:''});

		if(this.state.phone.length && this.state.password.length)		this.setState({ready:true});
	}

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
			let {response,error} = await request.phone_send_password(this.state.phone);
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
		let authorize = await request.authorize({phone:this.state.phone,password:this.state.password});
		if(authorize.response) {
			this.props.log_out();

			// Получаем данные
			let user_data = await request.get(authorize.response.user_id);
			if(user_data.response) {

				// Сохраняем
				this.props.update_user(user_data.response);

				// В асинхронное хранилище изменения тоже записываем
				st.merge('user',user_data.response);

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
					<TouchableOpacity style={state.ready ? styles.button : styles.button_disabled} onPress={this.enter}>
						<Text style={state.ready ? styles.button_text : styles.button_disabled_text}>Войти</Text>
					</TouchableOpacity>
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
