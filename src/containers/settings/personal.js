import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,Text,View} from 'react-native';

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
		backgroundColor: 'red',
	},
	save_text: {
		color: '#fff',
		fontSize: 24,
		textAlign: 'center',
	},
});

export default class Personal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name:			'',
			name_error:		'',
			father:			'',
			family:			'',
			gender:			1,
			city_id:		0,
			city_name:		'',
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
		}
	}

	update = async (state_adjust) => {
		await this.setState(state_adjust);
		this.props.update_data(this.state);
	}
	send = () => {
		if(!this.state.name.length)			this.setState({name_error:'Введите имя'});
		else if(!this.state.city_id)		this.setState({city_error:'Выберите город'});
		else if(!this.state.phone.length)	this.setState({phone_error:'Введите номер телефона'});
		else								this.props.send_data(this.state);
	}

	render() {
		let state = this.state;
		console.log("personal component",state);
		// console.log(state.phone_confirmed);

		return (
			<View style={styles.container}>
				<View style={styles.block}>
					<Text style={styles.title}>Персональные данные</Text>
					<Input
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
						title="Мобильный телефон"
						value={state.phone}
						disabled={state.id && state.phone_confirmed}
						need_confirm={state.id && !state.phone_confirmed}
						update={value => this.update({phone:value})}
						send={value => this.setState({phone:value})}
						error={state.phone_error}
					/>
					<Input
						title="E-mail"
						value={state.mail}
						update={value => this.update({mail:value})}
						send={value => this.setState({mail:value})}
						error={state.mail_error}
					/>
				</View>
				<TouchableOpacity style={styles.save} onPress={this.send}><Text style={styles.save_text}>Сохранить</Text></TouchableOpacity>
			</View>
		);
	}
}
