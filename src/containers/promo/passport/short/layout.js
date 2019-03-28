import React,{Component} from 'react';
import {FlatList,ImageBackground,Keyboard,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import AnimatedButton	from '../../../../templates/animated_button';
import Input			from '../../../../templates/input';
import DateInput		from '../../../../templates/input_date';
import SubTitle			from '../../../../templates/subtitle';
import TextArea			from '../../../../templates/textarea';

const styles = EStyleSheet.create({
	container: {
		paddingHorizontal: 20,
		backgroundColor: '#fff',
	},
	fio_area: {
		paddingTop: 20, paddingBottom: 15,
	},
	fio_text: {
		paddingBottom: 8,
		color: '#3d3d3d',
		fontSize: 14, lineHeight: 18,
		fontFamily: 'GothamPro',
		textAlign: 'center',
	},
	block: {
		marginBottom: 10,
	},
	subtitle: {
		paddingHorizontal: 20,
	},
	textarea: {
		height: 110,
	},
	button: {
		marginBottom: 20,
	},
	save: {
		alignItems: 'center',
		marginBottom: 25, padding: 15,
		borderRadius: 100,
		backgroundColor: '$red',
	},
	save_text: {
		color: '#fff',
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		lineHeight: 19,
	}
});

export default withNavigation(class GetPrizeEmailLayout extends Component {
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
			mail: {
				ref: React.createRef(),
				offset: 200*EStyleSheet.value("$scale"),
			},
			birthday: {
				ref: React.createRef(),
				offset: 250*EStyleSheet.value("$scale"),
			},
			address: {
				ref: React.createRef(),
				offset: 300*EStyleSheet.value("$scale"),
			},
		};

		this.required = ['name','father','family','mail','birthday','address'];

		this.state = {
			name: 		props.user.name,
			father: 	props.user.father,
			family: 	props.user.family,
			mail:		props.user.mail,
			birthday: 	props.user.birthday,
			address:	props.user.passport.address,

			name_error:   	'',
			father_error: 	'',
			family_error: 	'',
			mail_error:	 	'',
			birthday_error:	'',
			address_error:	'',

			waiting: false,
			ready: false,

			button_state: 'ready',
		};
	}

	componentDidMount() {
		this.check_ready();
	}
	componentDidUpdate(prev_props) {
		// Изменились данные о пользователе
		if(!Object.is(prev_props.user,this.props.user)) {
			this.setState(state => ({
				name:			this.props.user.name,
				father:			this.props.user.father,
				family:			this.props.user.family,
				mail:			this.props.user.mail,
				birthday:		this.props.user.birthday || state.birthday,
				address:		this.props.user.passport.address || state.address,
			}));
		}

		// Изменилось состояние запроса
		if(prev_props.state != this.props.state) {
			if(this.props.state == 'waiting') this.setState({button_state:'waiting'});
			if(this.props.state == 'succeed') this.setState({button_state:'end'});
			if(this.props.state == 'errored') this.setState({button_state:'ready'});
		}

		// Убираем ошибки
		if(this.state.name.length		&& this.state.name_error.length)		this.setState({name_error:''});
		if(this.state.father.length		&& this.state.father_error.length)		this.setState({father_error:''});
		if(this.state.family.length		&& this.state.family_error.length)		this.setState({family_error:''});
		if(this.state.birthday.length	&& this.state.birthday_error.length)	this.setState({birthday_error:''});
		if(this.state.address.length	&& this.state.address_error.length)		this.setState({address_error:''});
		if(!/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/.test(this.state.mail) && this.state.mail_error.length) this.setState({mail_error:''});
	}

	update = async (data) => {
		await this.setState(data);

		this.check_ready();
	}

	// Проверяем, готова ли форма
	check_ready = async () => {
		await this.setState(state => ({
			ready: this.required.every(field => state[field].length)
		}));
	}

	// Указание на ошибки при заполнении полей
	check_completeness = async () => {
		let state = this.state;

		await this.check_ready();

		// Проверяем поля
		let fields = [
			{
				field: 'name',
				error: 'Введите имя'
			},
			{
				field: 'father',
				error: 'Введите отчество'
			},
			{
				field: 'family',
				error: 'Введите фамилию'
			},
			{
				field: 'mail',
				error: 'Укажите почтовый ящик'
			},
			{
				field: 'birthday',
				error: 'Введите день рождения'
			},
			{
				field: 'address',
				error: 'Введите адрес регистрации'
			},
		];

		return fields.every(item => {
			let {field,error} = item;
			if(!state[field]?.length){
				this.setState({[field+'_error']:error});
				this.scroll.current.scrollTo({y:this.inputs[field].offset});
				return false;
			} else {
				this.setState({[field+'_error']:false});
				return true;
			}
		})
	}

	send = async () => {
		let state = this.state;
		Keyboard.dismiss();

		// Проверяем все поля
		if(!await this.check_completeness()) return;

		// Отправляем изменения
		await this.setState({waiting:true});
		await this.props.send_data({
			name:   	state.name,
			father: 	state.father,
			family: 	state.family,
			mail:	 	state.mail,
			birthday:	state.birthday,
			address:	state.address,
		});
		await this.setState({waiting:false});
	}

	render() {
		let {props,state} = this;

		return (
			<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={styles.container}>
				<View style={styles.fio_area}>
					<View style={styles.block}>
						<Text style={styles.fio_text}>Заполните форму для получения выигрыша по почте.</Text>
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
					</View>
					<View style={styles.block}>
						<Input
							id={this.inputs.mail.ref}
							title="E-mail"
							value={state.mail}
							type="email-address"
							disabled={props.user.mail.length}
							update={mail => this.update({mail})}
							error={state.mail_error}
							keyboard_options={{
								scroll: this.scroll,
								offset: this.inputs.mail.offset,
							}}
						/>
						<DateInput
							id={this.inputs.birthday.ref}
							title="Дата рождения"
							value={state.birthday}
							disabled={props.user.birthday.length}
							update={birthday => this.update({birthday})}
							error={state.birthday_error}
							keyboard_options={{
								scroll: this.scroll,
								offset: this.inputs.birthday.offset,
							}}
						/>
					</View>
					<View style={styles.block}>
						<SubTitle style={styles.subtitle} text="Адрес регистрации" />
						<TextArea
							id={this.inputs.address.ref}
							style={styles.textarea}
							value={state.address}
							placeholder="Укажите адрес постоянной регистрации (как в паспорте)"
							disabled={props.user.passport.address.length}
							update={address => this.update({address})}
							error={state.address_error}
							keyboard_options={{
								scroll: this.scroll,
								offset: this.inputs.address.offset,
							}}
						/>
					</View>
				</View>
				<View style={styles.button}>
					{/*
					<Text style={styles.address_text}>
						Текст, описывающий особенности получения выигрыша, правила и какие-то хитрости. Может занимать несколько строчек.
					</Text>
					*/}
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
})
