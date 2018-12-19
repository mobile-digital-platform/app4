import React,{Component} from 'react';
import {Alert,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon			from 'react-native-vector-icons/EvilIcons';

import Input		from '../../../templates/input';
import InputPhone	from '../../../templates/input_phone';

import {request}	from '../../../redux/reducers/settings';

const styles = StyleSheet.create({
	title: {
		// marginHorizontal: 20,
		color: '#bbb',
		fontSize: 14, fontWeight: 'bold',
		textTransform: 'uppercase',
	},
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
			phone: '79170000011',
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

	set_phone = async (phone) => {
		await this.setState({phone});
		this.setState({ready:this.state.phone.length && this.state.password.length});
	}
	set_password = async (password) => {
		await this.setState({password});
		this.setState({ready:this.state.phone.length && this.state.password.length});
	}

	ask_password = async () => {
		if(['starting','expired'].indexOf(this.state.state)>=0) {
			// Ставим таймер, чтоб заново запросить нельзя было
			this.timer(60);

			// Запрашиваем код
			let {response,error} = await request.phone_send_password(this.state.phone);
			if(response) {
				console.log(response);
			}
			if(error) {
				Alert.alert('Невозможно восстановить пароль','Проверьте правильность ввода номера телефона');
			}
		}
	}

	enter = async () => {
		if(this.state.phone_error.length || this.state.password_error.length) return;

		let {response,error} = await request.authorize({phone:this.state.phone,password:this.state.password});
		console.log(response,error);
		if(response) {
		}
		if(error) {
			Alert.alert(error.message);
		}
	}

	render() {
		let state = this.state;
		return (
			<View>
				<View style={styles.main}>
					<Text style={styles.main_text}>Для авторизации введите номер телефона и пароль, указанные при регистрации.</Text>
					<View style={styles.main_input}>
						<InputPhone title="Мобильный телефон" value={state.phone} error={state.phone_error} send={this.set_phone} />
					</View>
					<View style={styles.main_input}>
						<Input title="Пароль" password={true} value={state.password} error={state.password_error} send={this.set_password} />
					</View>
					<TouchableOpacity style={state.ready ? styles.button : styles.button_disabled} onPress={this.enter}>
						<Text style={state.ready ? styles.button_text : styles.button_disabled_text}>Войти</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.reset}>
					<Text style={styles.title}>Я забыл пароль</Text>
					{this.state.state != 'starting' ? (
						<Text style={[styles.reset_wait,this.state.state=='expired' ? styles.reset_wait_hide : {}]}>
							Отправить код повторно можно через {this.state.timeout} сек.
						</Text>
					) : null}
					<TouchableOpacity style={styles.reset_button} onPress={this.ask_password}>
						<Text style={styles.reset_button_text}>Восстановить пароль</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
});
