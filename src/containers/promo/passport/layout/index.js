import React,{Component} from 'react';
import {Keyboard,Platform,FlatList,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import f from '../../../../functions';

import AnimatedButton	from '../../../../templates/animated_button';
import Input			from '../../../../templates/input';
import DateInput		from '../../../../templates/input_date';
import SubTitle			from '../../../../templates/subtitle';
import TextArea			from '../../../../templates/textarea';

import Item				from './item';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	fio_area: {
		paddingBottom: 30,
	},
	text: {
		marginBottom: 10,
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		textAlign: 'center',
		lineHeight: 18,
	},
	block: {
		marginBottom: 20,
	},
	subtitle: {
		paddingHorizontal: 20,
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
	textarea: {
		height: 110,
	},
	photo_area: {
		marginBottom: 10,
	},
	button: {
		marginBottom: 30,
	},
	error_text: {
		marginLeft: 25, marginVertical: 10, paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 14, fontFamily: 'GothamPro',
		color: '$red',
	},
});

export default withNavigation(class PromoPassportLayout extends Component {
	constructor(props) {
		super(props);

		this.scroll = React.createRef();
		this.inputs = {
			name: {
				ref: React.createRef(),
				offset: 0,
			},
			father: {
				ref: React.createRef(),
				offset: 0,
			},
			family: {
				ref: React.createRef(),
				offset: 0,
			},
			birthday: {
				ref: React.createRef(),
				offset: 0*EStyleSheet.value("$scale"),
			},
			seria: {
				ref: React.createRef(),
				offset: 350*EStyleSheet.value("$scale"),
			},
			number: {
				ref: React.createRef(),
				offset: 350*EStyleSheet.value("$scale"),
			},
			date: {
				ref: React.createRef(),
				offset: 350*EStyleSheet.value("$scale"),
			},
			issuer: {
				ref: React.createRef(),
				offset: 350*EStyleSheet.value("$scale"),
			},
			address: {
				ref: React.createRef(),
				offset: 550*EStyleSheet.value("$scale"),
			},
			inn: {
				ref: React.createRef(),
				offset: 650*EStyleSheet.value("$scale"),
			},
		};

		this.required = ['name','father','family','birthday','seria','number','date','issuer','address','inn'];

		this.state = {
			name: 		props.user.name,
			father: 	props.user.father,
			family: 	props.user.family,
			birthday: 	props.user.birthday,

			seria:		props.user.passport.seria,
			number:		props.user.passport.number,
			date:		props.user.passport.date,
			issuer:		props.user.passport.issuer,
			address:	props.user.passport.address,
			inn:		props.user.passport.inn,

			passport_photo: {},
			passport_residence: {},
			inn_photo: {},

			name_error:   	'',
			father_error: 	'',
			family_error: 	'',
			birthday_error:	'',
			passport_error:	'',
			address_error:	'',
			inn_error:		'',
			photo_error:	'',

			waiting: false,
			ready: false,

			button_state: 'ready',
		};
	}

	componentDidUpdate(prev_props) {
		// Изменились данные о пользователе
		if(!Object.is(prev_props.user,this.props.user)) {
			this.setState(this.props.user);
		}

		// Изменилось состояние запроса
		if(prev_props.state != this.props.state) {
			if(this.props.state == 'waiting') this.setState({button_state:'waiting'});
			if(this.props.state == 'succeed') this.setState({button_state:'end'});
			if(this.props.state == 'errored') this.setState({button_state:'ready'});
		}
	}

	update = async (data) => {
		await this.setState(data);

		// Убираем ошибки
		if(this.state.name.length		&& this.state.name_error.length)		this.setState({name_error:false});
		if(this.state.father.length		&& this.state.father_error.length)		this.setState({father_error:false});
		if(this.state.family.length		&& this.state.family_error.length)		this.setState({family_error:false});
		if(this.state.birthday.length	&& this.state.birthday_error.length)	this.setState({birthday_error:false});

		if(this.state.passport_error.length) await this.check_passport_completeness();

		if(this.state.address.length	&& this.state.address_error.length)		this.setState({address_error:false});
		if(this.state.inn.length		&& this.state.inn_error.length)			this.setState({inn_error:false});

		if(this.state.photo_error.length) await this.check_photo_completeness();

		this.check_ready();
	}

	// Проверяем, готова ли форма
	check_ready = async () => {
		await this.setState(state => ({ready: (
			[state.passport_photo,state.passport_residence,state.inn_photo].every(e => e.state=='ready') &&
			this.required.every(field => state[field].length)
		)}));
	}

	// Указание на ошибки при заполнении полей
	check_completeness = async () => {
		let state = this.state;

		await this.check_ready();

		// Проверяем все поля

		// Имя
		if(!state.name.length){
			this.setState({name_error:'Введите имя'});
			this.scroll.current.scrollTo({y:this.inputs.name.offset});
			return false;
		} else {
			this.setState({name_error:''});
		}
		// Отчество
		if(!state.father.length){
			this.setState({father_error:'Введите отчество'});
			this.scroll.current.scrollTo({y:this.inputs.father.offset});
			return false;
		} else {
			this.setState({father_error:''});
		}
		// Фамилия
		if(!state.family.length){
			this.setState({family_error:'Введите фамилию'});
			this.scroll.current.scrollTo({y:this.inputs.family.offset});
			return false;
		} else {
			this.setState({family_error:''});
		}
		// День рождения
		if(!state.birthday.length){
			this.setState({birthday_error:'Введите дату рождения'});
			this.scroll.current.scrollTo({y:this.inputs.birthday.offset});
			return false;
		} else if(state.birthday>f.date("Y-m-d")){
			this.setState({birthday_error:'Вы родились в будущем?'});
			this.scroll.current.scrollTo({y:this.inputs.birthday.offset});
			return false;
		} else {
			this.setState({birthday_error:''});
		}
		// Адрес
		if(!state.address.length){
			this.setState({address_error:'Укажите адрес регистрации'});
			this.scroll.current.scrollTo({y:this.inputs.address.offset});
			return false;
		} else {
			this.setState({address_error:''});
		}
		// ИНН
		if(!state.inn.length){
			this.setState({inn_error:'Укажите ИНН'});
			this.scroll.current.scrollTo({y:this.inputs.inn.offset});
			return false;
		} else if(state.inn.length > 12){
			this.setState({inn_error:'ИНН состоит из 12 цифр'});
			this.scroll.current.scrollTo({y:this.inputs.inn.offset});
			return false;
		} else {
			this.setState({inn_error:''});
		}

		// Кажется, все в порядке
		return true;
	}
	check_passport_completeness = async () => {
		let state = this.state;

		await this.check_ready();

		// Проверяем все поля

		// Серия
		if(!state.seria.length) {
			this.setState({passport_error:'Введите серию'});
			this.scroll.current.scrollTo({y:this.inputs.seria.offset});
			return false;
		} else if(state.seria.length > 4) {
			this.setState({passport_error:'Серия состоит из 4 цифр'});
			this.scroll.current.scrollTo({y:this.inputs.seria.offset});
			return false;
		}
		// Номер
		if(!state.number.length) {
			this.setState({passport_error:'Введите номер'});
			this.scroll.current.scrollTo({y:this.inputs.number.offset});
			return false;
		} else if(state.number.length > 6) {
			this.setState({passport_error:'Номер состоит из шести цифр'});
			this.scroll.current.scrollTo({y:this.inputs.number.offset});
			return false;
		}
		// Дата выдачи
		if(!state.date.length) {
			this.setState({passport_error:'Укажите дату выдачи'});
			this.scroll.current.scrollTo({y:this.inputs.date.offset});
			return false;
		} else if(state.date > f.date("Y-m-d")) {
			this.setState({passport_error:'Вам выдали паспорт в будущем?'});
			this.scroll.current.scrollTo({y:this.inputs.date.offset});
			return false;
		}
		// Кем выдан
		if(!state.issuer.length) {
			this.setState({passport_error:'Укажите, кем выдан паспорт'});
			this.scroll.current.scrollTo({y:this.inputs.issuer.offset});
			return false;
		}

		// Если все в порядке, убираем ошибки
		this.setState({passport_error:''});
		return true;
	}
	check_photo_completeness = async () => {
		let state = this.state;

		await this.check_ready();

		// Проверяем все поля
		if(!state.passport_photo.state) {
			this.setState({'photo_error':'Сделайте фотографию разворота паспорта'});
			return false;
		} else if(state.passport_photo.state != 'ready') {
			this.setState({'photo_error':'Дождитесь сохранения фотографии'});
			return false;
		}
		if(!state.passport_residence.state) {
			this.setState({'photo_error':'Сделайте фотографию прописки в паспорте'});
			return false;
		} else if(state.passport_residence.state != 'ready') {
			this.setState({'photo_error':'Дождитесь сохранения фотографии'});
			return false;
		}
		if(!state.inn_photo.state) {
			this.setState({'photo_error':'Сделайте фотографию ИННа'});
			return false;
		} else if(state.inn_photo.state != 'ready') {
			this.setState({'photo_error':'Дождитесь сохранения фотографии'});
			return false;
		}

		// Если все в порядке, убираем ошибки
		this.setState({'photo_error':''});
		return true;
	}

	send = async () => {
		let state = this.state;
		Keyboard.dismiss();

		// Проверяем все поля
		if(!await this.check_completeness() || !await this.check_passport_completeness() || !await this.check_photo_completeness()) return;

		// Отправляем изменения
		await this.setState({waiting:true});
		await this.props.send_data({
			name: 		state.name,
			father: 	state.father,
			family: 	state.family,
			birthday: 	state.birthday,

			seria:		state.seria,
			number:		state.number,
			date:		state.date,
			issuer:		state.issuer,
			address:	state.address,
			inn:		state.inn,

			passport_photo:		state.passport_photo,
			passport_residence:	state.passport_residence,
			inn_photo:			state.inn_photo,
		});
		await this.setState({waiting:false});
	}

	render() {
		let {props,state} = this;

		// console.log(state);

		return (
			<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={styles.container}>
				<View style={styles.fio_area}>
					<Text style={styles.text}>В соответствии с законодательством, для получения выигрыша требуются ваши паспортные данные и ИНН.</Text>
					<Input
						id={this.inputs.name.ref}
						title="Имя"
						value={state.name}
						disabled={props.user.name.length}
						update={name => this.update({name})}
						error={state.name_error}
						keyboard_options={{
							scroll: this.scroll,
							offset: this.inputs.name.offset,
						}}
					/>
					<Input
						id={this.inputs.father.ref}
						title="Отчество"
						value={state.father}
						disabled={props.user.father.length}
						update={father => this.update({father})}
						error={state.father_error}
						keyboard_options={{
							scroll: this.scroll,
							offset: this.inputs.father.offset,
						}}
					/>
					<Input
						id={this.inputs.family.ref}
						title="Фамилия"
						value={state.family}
						disabled={props.user.family.length}
						update={family => this.update({family})}
						error={state.family_error}
						keyboard_options={{
							scroll: this.scroll,
							offset: this.inputs.family.offset,
						}}
					/>
					<DateInput
						id={this.inputs.birthday.ref}
						title="Дата рождения"
						value={state.birthday}
						update={birthday => this.update({birthday})}
						error={state.birthday_error}
						max={new Date()}
						keyboard_options={{
							scroll: this.scroll,
							offset: this.inputs.birthday.offset,
						}}
					/>
				</View>
				<View style={styles.passport_area}>
					<View style={styles.block}>
						<SubTitle style={styles.subtitle} text="Паспорт" />
						<View style={styles.seria_number}>
							<View style={styles.seria}>
								<Input
									id={this.inputs.seria.ref}
									title="Серия"
									type="numeric"
									value={state.seria}
									type="numeric"
									size={4}
									update={seria => this.update({seria})}
									keyboard_options={{
										scroll: this.scroll,
										offset: this.inputs.seria.offset,
									}}
								/>
							</View>
							<View style={styles.number}>
								<Input
									id={this.inputs.number.ref}
									title="Номер"
									type="numeric"
									value={state.number}
									size={6}
									update={number => this.update({number})}
									keyboard_options={{
										scroll: this.scroll,
										offset: this.inputs.number.offset,
									}}
								/>
							</View>
						</View>
						<DateInput
							id={this.inputs.date.ref}
							title="Дата выдачи паспорта"
							value={state.date}
							update={date => this.update({date})}
							max={new Date()}
							keyboard_options={{
								scroll: this.scroll,
								offset: this.inputs.date.offset,
							}}
						/>
						<Input
							id={this.inputs.issuer.ref}
							title="Кем выдан"
							value={state.issuer}
							update={issuer => this.update({issuer})}
							keyboard_options={{
								scroll: this.scroll,
								offset: this.inputs.issuer.offset,
							}}
						/>
						{state.passport_error?.length ? (<Text style={styles.error_text}>{state.passport_error}</Text>) : null}
					</View>
					<View style={styles.block}>
						<SubTitle style={styles.subtitle} text="Адрес регистрации" />
						<TextArea
							id={this.inputs.address.ref}
							style={styles.textarea}
							value={state.address}
							placeholder="Укажите адрес постоянной регистрации (как в паспорте)"
							update={address => this.update({address})}
							error={state.address_error}
							keyboard_options={{
								scroll: this.scroll,
								offset: this.inputs.address.offset,
							}}
						/>
					</View>
					<View style={styles.block}>
						<SubTitle style={styles.subtitle} text="ИНН" />
						<Input
							title="ИНН (12 цифр)"
							type="numeric"
							value={state.inn}
							size={12}
							update={inn => this.update({inn})}
							error={state.inn_error}
							keyboard_options={{
								scroll: this.scroll,
								offset: this.inputs.inn.offset,
							}}
						/>
					</View>
				</View>
				<View style={styles.photo_area}>
					<SubTitle style={styles.subtitle} text="Загрузите фотографии или сканы" />
					<Item
						text="Паспорт, разворот с фотографией"
						add_photo={passport_photo => this.update({passport_photo})}
						remove_photo={_ => this.update({passport_photo:{}})}
					/>
					<Item
						text="Паспорт, разворот с «пропиской»"
						add_photo={passport_residence => this.update({passport_residence})}
						remove_photo={_ => this.update({passport_residence:{}})}
					/>
					<Item
						text="ИНН"
						add_photo={inn_photo => this.update({inn_photo})}
						remove_photo={_ => this.update({inn_photo:{}})}
					/>
					{state.photo_error?.length ? (<Text style={styles.error_text}>{state.photo_error}</Text>) : null}
				</View>
				<View style={styles.button}>
					<AnimatedButton
						active={this.state.ready}
						state={this.state.button_state}
						on_press={this.send}
						on_end={this.props.button_on_end}
					>
						Отправить
					</AnimatedButton>
				</View>
			</ScrollView>
		)
	}
});
