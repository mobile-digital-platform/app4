import React,{Component} from 'react';
import {StyleSheet,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import Input from '../../../templates/input';

import alert		from '../../../services/alert';
import st			from '../../../services/storage';

import {request}	from '../../../redux/reducers/settings';

const styles = StyleSheet.create({
	main: {
		padding: 20,
	},
	main_text: {
		fontSize: 16,
		textAlign: 'center',
	},
	main_input: {
		paddingVertical: 15,
	},
	main_button: {
		marginBottom: 10, padding: 15,
		borderRadius: 40,
	},
	main_button_text: {
		fontSize: 20, fontWeight: 'bold',
		textAlign: 'center',
	},
	again: {
		paddingVertical: 20, paddingHorizontal: 40,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},
	again_title: {
		color: '#bbb',
		fontSize: 14, fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	again_wait: {
		paddingVertical: 10,
		color: 'red',
	},
	again_wait_hide: {
		color: 'transparent',
	},
	again_button: {
		marginVertical: 10, padding: 15,
		borderRadius: 100,
	},
	again_button_text: {
		fontSize: 20,
		textAlign: 'center',
	},

	active_button: {
		backgroundColor: '#f40000',
	},
	active_button_text: {
		color: '#fff',
	},
	passive_button: {
		backgroundColor: '#f1f1f1',
	},
	passive_button_text: {
		color: '#d5d5d5',
	},
});

export default withNavigation(class ConfirmPhoneComponent extends Component {
	constructor(props) {
		super(props);

		this.timeout;
		this.state = {
			code: '',
			timeout: 0,
			state: 'starting',
		};
	}

	componentDidMount() {
		this.ask_code();
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

	again = async () => {
		this.ask_code();
		this.setState({state:'waiting'});
	}

	ask_code = async () => {
		if(['starting','expired'].indexOf(this.state.state)>=0) {
			// Ставим таймер, чтоб заново запросить нельзя было
			this.timer(60);

			// Запрашиваем код
			let {response,error} = await request.phone_send_code(this.props.user.id);
			if(response) {
				console.log(response);
			}
			if(error) {
				// Даже если и ошибка, пользователю мы в этом не признаемся
			}
		}
	}

	send = async () => {
		if(this.state.state == 'expired') {
			alert('Срок действия смс истек','Пожалуйста, запросите новую');
		} else if(this.state.code.length) {
			let {response,error} = await request.phone_confirm({user_id:this.props.user.id,code:this.state.code});
			if(response) {
				this.props.update_user({phone_confirmed:true});
				st.merge('user',{phone_confirmed:true});
				await alert('Номер телефона успешно подтвержден');
				this.props.navigation.goBack();
			}
			if(error) {
				console.log('error',error);
				alert(error.message);
			}
		}
	}

	render() {
		let state = this.state;
		// console.log("ConfirmPhoneComponent",this.props,this.state);

		let main_button_styles			= [styles.main_button];
		let main_button_text_styles		= [styles.main_button_text];
		let again_button_styles			= [styles.again_button];
		let again_button_text_styles	= [styles.again_button_text];

		main_button_styles[1]		= (this.state.state == 'expired') ? styles.passive_button		: styles.active_button;
		main_button_text_styles[1]	= (this.state.state == 'expired') ? styles.passive_button_text	: styles.active_button_text;
		again_button_styles[1]		= (this.state.state == 'expired') ? styles.active_button		: styles.passive_button;
		again_button_text_styles[1]	= (this.state.state == 'expired') ? styles.active_button_text	: styles.passive_button_text;

		return (
			<ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
				<View style={styles.main}>
					<Text style={styles.main_text}>На ваш телефон отправлено SMS-сообщение с кодом подтверждения. Введите этот код в поле:</Text>
					<View style={styles.main_input}><Input title="Код из SMS" value={state.code} type="numeric" update={code => this.setState({code})} /></View>
					<TouchableOpacity style={main_button_styles} onPress={this.send}>
						<Text style={main_button_text_styles}>Подтвердить</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.again}>
					<Text style={styles.again_title}>Я не получил SMS-сообщение</Text>
					<Text style={[styles.again_wait,this.state.state=='expired' ? styles.again_wait_hide : {}]}>
						Отправить код повторно можно через {this.state.timeout} сек.
					</Text>
					<TouchableOpacity style={again_button_styles} onPress={this.again}>
						<Text style={again_button_text_styles}>Повторить</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
})
