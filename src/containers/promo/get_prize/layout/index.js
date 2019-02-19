import React,{Component} from 'react';
import {StyleSheet,FlatList,ImageBackground,Keyboard,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Input		from '../../../../templates/input';
import DateInput	from '../../../../templates/input_date';
import SelectAdress	from '../../../../templates/select_adress';
import SubTitle		from '../../../../templates/subtitle';

const styles = EStyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingHorizontal: 20,
	},
	fio_area: {
		paddingTop: 20, paddingBottom: 10,
	},
	fio_text: {
		color: '#3d3d3d',
		fontSize: 14, lineHeight: 18,
		fontFamily: 'GothamPro',
		textAlign: 'center',
		paddingBottom: 8, marginBottom: 5,
	},
	block: {
		marginBottom: 10,
	},
	adress_title: {
		paddingHorizontal: 20,
	},
	adress_text: {
		color: '#3d3d3d',
		fontSize: 14, lineHeight: 18,
		fontFamily: 'GothamPro',
		textAlign: 'center',
		paddingBottom: 8, 
		marginTop: 20, marginBottom: 25,
	},
	save: {
		backgroundColor: '$red',
		alignItems: 'center',
		marginBottom: 30,
		padding: 15,
		borderRadius: 100,
	},
	save_text: {
		color: '#fff',
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		lineHeight: 19,
	}
});


export default withNavigation(class GetPrize extends Component {
	constructor(props) {
		super(props);
		props = props.user;
		console.log('constructor',this)
		this.state = {
			name: 		props.name ??  '',
			father: 	props.father ?? '',
			family: 	props.family ?? '',
			mail: 		props.mail ?? '',
			birthday: 	props.birthday ?? '',
			adress: 	props.adress.complete ?? '',

			name_error:   	false,
			father_error: 	false,
			family_error: 	false,
			mail_error:	 	false,
			birthday_error:	false,
			adress_error: 	false,
			// если данные уже были в хранилище, то делаем поле нередактируемым
			name_editable: 	 !props.name,
			father_editable: !props.father,
			family_editable: !props.family,
			mail_editable:	 !props.mail,
		};
	}

	componentDidUpdate(prev_props) {
		if(!Object.is(prev_props.user,this.props.user)) {
			let props = this.props.user;
			let state = this.state;
			console.log('componentDidUpdate_this',this)
			this.setState({
				name: 			 props.name ?? state.name ?? '',
				father: 		 props.father ?? state.father ?? '',
				family: 		 props.family ?? state.family ?? '',
				mail: 			 props.mail ?? state.mail ?? '',
				birthday: 		 props.birthday ?? state.birthday ?? '',
				adress: 		 props.adress.complete ?? state.adress ?? '',

				name_editable: 	 !props.name,
				father_editable: !props.father,
				family_editable: !props.family,
				mail_editable:	 !props.mail,
			})

			// убираем ошибки, если на других страницах пользователь ввел данные
			let fields = ['name', 'father', 'family', 'mail', 'birthday', 'adress'];
			fields.forEach(field => {
				if (props[field].length && state[field + '_error']) {
					this.setState({ [field + '_error']: false });
				}
			})
		}
	}

	update = async (data) =>{
		await this.setState(data);
		// убираем ошибки
		let state = this.state;
		let fields = ['name','father','family','mail','birthday'];
		fields.forEach(field =>{
			if(state[field].length && state[field+'_error']){
				this.setState({[field+'_error']:false});
			}
		})
	}

	check_completeness = () =>{
		// Проверяем поля
		let state = this.state;
		let fields = [
			{
				field: 'name',
				error:  'Введите имя'
			},
			{
				field: 'father',
				error:  'Введите отчество'
			},
			{
				field: 'family',
				error:  'Введите фамилию'
			},
			{
				field: 'mail',
				error:  'Введите почтоый ящик'
			},
			{
				field: 'birthday',
				error:  'Введите день рождения'
			},
			{
				field: 'adress',
				error:  'Введите адрес доставки'
			},
		]
		return fields.every(item =>{
			let {field,error} = item;
			if(!state[field]?.length){
				this.setState({[field+'_error']:error});
				//this.props.scroll.current.scrollTo({y:this.inputs.field.offset});
				return false;
			} else{
				this.setState({[field+'_error']:false});
				return true;
			}
		})
	}

	send = () =>{
		let state = this.state;
		Keyboard.dismiss();

		if (!this.check_completeness()) return;
	}

	render() {
		let {state,props} = this;
		console.log('render_this',this)
		return (
			<ScrollView style={styles.container}>
				<View style={styles.fio_area}>
					<View style={styles.block}>
						<Text style={styles.fio_text}>Заполните форму для получения выигрыша почтой.</Text>
						<Input
							title="Имя"
							value={state.name}
							update={value => this.update({ name: value })}
							error={state.name_error}
							editable={state.name_editable}
						/>
						<Input
							title="Отчество"
							value={state.father}
							update={value => this.update({ father: value })}
							error={state.father_error}
							editable={state.father_editable}
						/>
						<Input
							title="Фамилия"
							value={state.family}
							update={value => this.update({ family: value })}
							error={state.family_error}
							editable={state.family_editable}
						/>
					</View>
					<View style={styles.block}>
						<Input
							title="E-mail"
							value={state.mail}
							update={value => this.update({ mail: value })}
							error={state.mail_error}
							type="email-address"
							editable={state.mail_editable}
						/>
						<DateInput
							title="Дата рождения"
							value={state.birthday}
							update={value => this.update({ birthday: value })}
							error={state.birthday_error}
						/>
					</View>
				</View>
				<View style={styles.adress_area}>
					<SubTitle style={styles.adress_title} text="Адрес доставки" />
					<SelectAdress
						title="Укажите адрес доставки"
						value={state.adress}
						error={state.adress_error}
					/>
					<Text style={styles.adress_text}>Текст, описывающий особенности получения выигрыша, правила и какие-то хитрости. Может занимать несколько строчек.</Text>
					<TouchableOpacity style={styles.save} onPress={this.send}>
						<Text style={styles.save_text}>Отправить</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
})