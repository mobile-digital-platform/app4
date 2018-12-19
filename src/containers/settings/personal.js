import React,{Component} from 'react';
import {Dimensions,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Text,View} from 'react-native';

import ReactNative,{Keyboard,UIManager,findNodeHandle,Animated} from 'react-native';

import Input		from '../../templates/input';
import InputPhone	from '../../templates/input_phone';
import Textarea		from '../../templates/textarea';
import SelectCity	from '../../templates/select_city';

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	block: {
		paddingVertical: 10,
	},
	title: {
		paddingBottom: 10, paddingHorizontal: 25,
		color: '#bbb',
		fontSize: 14, fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	save: {
		marginTop: 10, padding: 15,
		borderRadius: 100,
	},
	save_text: {
		fontSize: 24,
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
				offset: 250,
			},
			mail: {
				ref: React.createRef(),
				offset: 300,
			},
		}

		this.state = {
			waiting:		false,
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
			mail:			'',
			mail_confirmed:	false,
			mail_error:		'',
		};
	}

	componentDidUpdate(prev_props) {
		if(!Object.is(this.props.state.personal_data,prev_props.state.personal_data)) {
			this.setState(this.props.state.personal_data);
			if(this.state.city_error && this.props.state.personal_data.city_id) this.setState({city_error:''});
		}
	}

	update = async (state_adjust) => {
		await this.setState(state_adjust);
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

		// Убираем показ ошибок, если они исправлены
		if(this.state.name.length	&& this.state.name_error)	this.setState({name_error:''});
		if(this.state.city_id		&& this.state.city_error)	this.setState({city_error:''});
		if(this.state.phone.length	&& this.state.phone_error)	this.setState({phone_error:''});
	}
	send = async () => {
		if(this.state.waiting) return;

		// Проверяем имя
		if(!this.state.name.length) {
			this.props.scroll.current.scrollTo({y:this.inputs.name.offset});
			this.setState({name_error:'Введите имя'});
			return;
		} else {
			await this.setState({name_error:''});
		}
		// Проверяем город
		if(!this.state.city_id) {
			this.props.scroll.current.scrollTo({y:this.inputs.city.offset});
			this.setState({city_error:'Выберите город'});
			return;
		} else {
			await this.setState({city_error:''});
		}
		// Проверяем номер телефона
		if(!this.state.phone.length) {
			this.props.scroll.current.scrollTo({y:this.inputs.phone.offset});
			this.setState({phone_error:'Введите номер телефона'});
			return;
		} else {
			await this.setState({phone_error:''});
		}

		await this.setState({waiting:true});
		await this.props.send_data({
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
		this.setState({waiting:false});
	}

	render() {
		let state = this.state;
		// console.log("personal component",state);

		return (
			<View style={styles.container}>
				<View style={styles.block}>
					<Text style={styles.title}>Персональные данные</Text>
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
					<Text style={styles.title}>Контакты</Text>
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
