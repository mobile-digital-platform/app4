import React,{Component} from 'react';
import {Keyboard,Platform,StyleSheet,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Input		from '../../../templates/input';
import SubTitle		from '../../../templates/subtitle';

import alert		from '../../../services/alert';
import st			from '../../../services/storage';

import {request}	from '../../../redux/reducers/settings';

const styles = EStyleSheet.create({
	main: {
		padding: 20,
	},
	main_text: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		textAlign: 'center',
		lineHeight: 18,
	},
	main_input: {
		paddingVertical: 15,
	},
	main_button: {
		marginBottom: 10, padding: 15,
		borderRadius: 40,
	},
	main_button_text: {
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
	},
	again: {
		paddingVertical: 20, paddingHorizontal: 40,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},
	again_wait: {
		color: '$red',
		fontSize: 12,
		lineHeight: 14,
	},
	again_wait_hide: {
		color: 'transparent',
	},
	again_button: {
		marginVertical: 15, padding: 10,
		borderRadius: 100,
	},
	again_button_text: {
		fontSize: 14, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
		lineHeight: 16,
	},

	active_button: {
		backgroundColor: '$red',
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

			// Запрашиваем код
			this.props.open_smoke();
			let {response,error} = await request.phone_send_code(this.props.user.id);
			if(response) {
				// this.setState({code:response.code});
				if(this.state.state == 'expired') alert("Код отправлен повторно");
			}
			if(error) {
				// Даже если и ошибка, пользователю мы в этом не признаемся
			}
			this.props.close_smoke();
			this.timer(60);
		} else {
			alert("Вы уже запросили смс");
		}
	}

	send = async () => {
		Keyboard.dismiss();
		if(!this.state.code.length) {
			alert("Введите код из смс");
			return;
		}

		this.props.open_smoke();
		let {response,error} = await request.phone_confirm({user_id:this.props.user.id,code:this.state.code});
		this.props.close_smoke();
		if(response) {
			this.props.update_user({phone_confirmed:true});
			st.merge('user',{phone_confirmed:true});
			await alert('Номер телефона успешно подтвержден');
			this.props.navigation.goBack();
		}
		if(error) {
			console.log('error',error);
			await alert(error.message);
		}
		this.props.close_smoke();
	}

	render() {
		let state = this.state;
		// console.log("ConfirmPhoneComponent",this.props,this.state);

		let main_button_styles			= [styles.main_button];
		let main_button_text_styles		= [styles.main_button_text];
		let again_button_styles			= [styles.again_button];
		let again_button_text_styles	= [styles.again_button_text];

		main_button_styles[1]		= styles.active_button;
		main_button_text_styles[1]	= styles.active_button_text;
		again_button_styles[1]		= (this.state.state == 'expired') ? styles.active_button		: styles.passive_button;
		again_button_text_styles[1]	= (this.state.state == 'expired') ? styles.active_button_text	: styles.passive_button_text;

		return (
			<ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
				<View style={styles.main}>
					<Text style={styles.main_text}>На ваш телефон отправлено СМС-сообщение с кодом подтверждения. Введите этот код в поле:</Text>
					<View style={styles.main_input}><Input title="Код из SMS" value={state.code} type="numeric" update={code => this.setState({code})} /></View>
					<TouchableOpacity style={main_button_styles} onPress={this.send}>
						<Text style={main_button_text_styles}>Подтвердить</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.again}>
					<SubTitle text="Я не получил SMS-сообщение" />
					<Text style={[styles.again_wait,this.state.state=='expired' ? styles.again_wait_hide : {}]}>
						Отправить код повторно можно{'\n'}через {this.state.timeout} сек.
					</Text>
					<TouchableOpacity style={again_button_styles} onPress={this.again}>
						<Text style={again_button_text_styles}>Повторить</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
})
