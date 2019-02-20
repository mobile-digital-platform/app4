import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Item				from './item';
import DateInput		from '../../../../templates/input_date';
import SelectAdress		from '../../../../templates/select_adress';

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		backgroundColor: '#fff',
	},
	fio_area: {
		paddingBottom: 30,
	},
	text: {
		color: '#3d3d3d',
		fontSize: 14, lineHeight: 18,
		fontFamily: 'GothamPro',
		textAlign: 'center',
		paddingBottom: 8, marginBottom: 10,
	},
	block: {
		paddingBottom: 20,
	},
	passport_title: {
		paddingHorizontal: 20,
		paddingBottom: 5,
	},
	adress_title: {
		paddingHorizontal: 20,
		paddingBottom: 5,
	},
	inn_title: {
		paddingHorizontal: 20,
		paddingBottom: 5,
	},
	photo_title: {
		paddingHorizontal: 20,
		paddingBottom: 0,
	},
	seria_number: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	seria: {
		width: 110,
	},
	number: {
		width: 160,
	},
	save: {
		backgroundColor: '$red',
		alignItems: 'center',
		marginTop: 20, marginBottom: 30,
		padding: 15,
		borderRadius: 100,
	},
	save_text: {
		color: '#fff',
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		lineHeight: 19,
	}
});

export default withNavigation(class Passport extends Component {
	constructor(props) {
		super(props);
		props = props.user;
		console.log('constructor',this)
		this.state = {
			name: 		props.name ??  '',
			father: 	props.father ?? '',
			family: 	props.family ?? '',
			birthday: 	props.birthday ?? '',
			
			seria: ''
			num: ''
			date: ''
			issuer: ''
			adress: ''
			inn: ''
			
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
		let { state, props } = this;
		console.log('render_this', this)
		return (
			<ScrollView style={styles.container}>
				<View style={styles.fio_area}>
					<Text style={styles.text}>В соответствии с законодательством, для получения выигрыша требуются ваши паспортные данные и ИНН.</Text>
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
					<DateInput
						title="Дата рождения"
						value={state.birthday}
						update={value => this.update({ birthday: value })}
						error={state.birthday_error}
					/>
				</View>
				{/* <View style={styles.passport_area}>
					<View style={styles.block}>
						<SubTitle style={styles.passport_title} text="Паспорт" />
						<View style={styles.seria_number}>
							<View style={styles.seria}>
								<Input
									title="Серия"
									value={state.father}
									update={value => this.update({ father: value })}
									error={state.father_error}
									type="numeric"
								/>
							</View>
							<View style={styles.number}>
								<Input
									title="Номер"
									value={state.family}
									update={value => this.update({ family: value })}
									error={state.family_error}
									type="numeric"
								/>
							</View>
						</View>
						<DateInput
							title="Дата выдачи паспорта"
							value={state.birthday}
							update={value => this.update({ birthday: value })}
							error={state.birthday_error}
						/>
						<Input
							title="Кем выдан"
							value={state.family}
							update={value => this.update({ family: value })}
							error={state.family_error}
							editable={state.family_editable}
						/>
					</View>
					<View style={styles.block}>
						<SubTitle style={styles.adress_title} text="Адрес регистрации" />
						<SelectAdress
							title="Укажите адрес постоянной регистрации (как в паспорте)"
							value={state.adress}
							error={state.adress_error}
						/>
					</View>
					<View style={styles.block}>
						<SubTitle style={styles.inn_title} text="ИНН" />
						<Input
							title="ИНН"
							value={state.family}
							update={value => this.update({ family: value })}
							error={state.family_error}
							editable={state.family_editable}
						/>
					</View>
				</View> */}
				{/* <View style={styles.photo_area}>
					<SubTitle style={styles.photo_title} text="Загрузите фотографии или сканы" />
					<View>
						<Item text="Паспорт, разворот с фотографией" value={} />
						<Item text="Паспорт, разворот с «пропиской»" value={} />
						<Item text="ИНН" value={} />
					</View>
					<TouchableOpacity style={styles.save} onPress={this.send}>
						<Text style={styles.save_text}>Отправить</Text>
					</TouchableOpacity>
				</View> */}
			</ScrollView>
		)
	}
})
