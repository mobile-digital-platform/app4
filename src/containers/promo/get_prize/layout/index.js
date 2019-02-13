import React,{Component} from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Input		from '../../../../templates/input';
import SelectAdress	from '../../../../templates/select_adress';
import SubTitle		from '../../../../templates/subtitle';

const styles = EStyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingTop: 20, paddingHorizontal: 20,
	},
	fio_area: {
		paddingBottom: 30
	},
	text: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
		textAlign: 'center',
		marginBottom: 15,
	},
	title: {
		paddingHorizontal: 20,
	},
	save: {
		marginTop: 25, marginBottom: 10,
		padding: 15,
		borderRadius: 100,
		backgroundColor: '#f1f1f1',
	},
	save_text: {
		color: '#d5d5d5',
		fontSize: 20,
		textAlign: 'center',
	}
});


export default class GetPrize extends Component {
	constructor(props) {
		super(props);
		props = props.user;
		
		this.state = {
			name: 			props.name ?? '',
			father: 		props.father ?? '',
			family: 		props.family ?? '',
			adress: 		props.adress?.full ?? '',
			name_error: 	false,
			father_error: 	false,
			family_error: 	false,
			waiting: 		false,
		}
	}
	componentDidUpdate(prev_props) {
		// Изменились данные о пользователе
		if(!Object.is(prev_props.user,this.props.user)) {
			this.setState({
				name: 			this.props.name ?? '',
				father: 		this.props.father ?? '',
				family: 		this.props.family ?? '',
				adress: 		this.props.adress?.full ?? '',
			});
		}
	}
	// Все остальные поля
	update = async (adjust) => {
		await this.setState({...adjust});
	}

	send_data = async () => {
		let state = this.state;

		Keyboard.dismiss();
		if(state.waiting) return;

		// Проверяем все поля
		if(!await this.check_completeness()) return;

		// Отправляем изменения
		await this.setState({waiting:true});
		await this.props.send_data({
			name:		state.name,
			father: 	state.father,
			family: 	state.family,
			adress: 	state.adress,
		});
		await this.setState({updated:false,waiting:false});
	}

	render() {
		let {state,props} = this;
		console.log('ready state', state);
		return (
				<ScrollView style={styles.container}>
					<View style={styles.fio_area}>
						<Text style={styles.text}>Заполните форму для получения выигрыша почтой.</Text>
						<Input
							title="Имя"
							value={state.name}
							update={value => this.update({ name: value })}
							error={state.name_error}
							editable={props.name ? true : false}
						/>
						<Input
							title="Отчество"
							value={state.father}
							update={value => this.update({ father: value })}
							error={state.father_error}
							editable={props.father ? true : false}
						/>
						<Input
							title="Фамилия"
							value={state.family}
							update={value => this.update({ family: value })}
							error={state.family_error}
							editable={props.family ? true : false}
						/>
					</View>
					<View style={styles.adress_area}>
						<SubTitle style={styles.title} text="Укажите адресс доставки" />
						<SelectAdress
							value={state.adress}
							update={value => this.update({ adress: value })}
							error={state.name_error}
						/>
					</View>
					<TouchableOpacity style={styles.save} onPress={this.send}>
						<Text style={styles.save_text}>Отправить</Text>
					</TouchableOpacity>
				</ScrollView>
		)
	}
}