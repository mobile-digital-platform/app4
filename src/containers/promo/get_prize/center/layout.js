import React,{Component} from 'react';
import {FlatList,ImageBackground,Keyboard,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Input		from '../../../../templates/input';
import InputPhone	from '../../../../templates/input_phone';
import Select		from '../../../../templates/select';

import YandesMaps	from './map';

const styles = EStyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	fio_area: {
		paddingHorizontal: 20,
		paddingTop: 20, paddingBottom: 15,
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
	map: {
		height: 250, width: '100%',
		backgroundColor: '#ccc',
	},
	save: {
		alignItems: 'center',
		margin: 20,
		padding: 15,
		borderRadius: 100,
		backgroundColor: '$red',
	},
	save_text: {
		color: '#fff',
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		lineHeight: 19,
	}
});

export default withNavigation(class GetPrizeCenterLayout extends Component {
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
			phone: {
				ref: React.createRef(),
				offset: 150*EStyleSheet.value("$scale"),
			},
			mail: {
				ref: React.createRef(),
				offset: 200*EStyleSheet.value("$scale"),
			},
			center: {
				ref: React.createRef(),
				offset: 300*EStyleSheet.value("$scale"),
			},
		};

		this.required = ['name','father','family','phone','mail','center'];

		this.state = {
			...props.user,

			center: -1,

			name_error:   	'',
			father_error: 	'',
			family_error: 	'',
			mail_error:	 	'',
			center_error: 	'',

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
		if(this.state.mail.length		&& this.state.mail_error.length)		this.setState({mail_error:false}); // потом нормальную надо сделать
		if(this.state.center.length		&& this.state.center_error.length)		this.setState({center_error:false});
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
				field: 'phone',
				error: 'Введите номер телефона'
			},
			{
				field: 'mail',
				error: 'Укажите почтоый ящик'
			},
			{
				field: 'center',
				error: 'Выберите центр выдачи'
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
			center: 	state.center,
		});
		await this.setState({waiting:false});
	}

	render() {
		let {props,state} = this;

		let center_list = props.list.map(e => ({id:e.id,title:e.name}));

		return (
			<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={styles.container}>
				<View style={styles.fio_area}>
					<View style={styles.block}>
						<Text style={styles.fio_text}>Заполните форму для получения выигрыша в Центре выдачи призов.</Text>
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
						<InputPhone
							id={this.inputs.phone.ref}
							title="Мобильный телефон"
							value={state.phone}
							disabled={props.user.phone.length}
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
							type="email-address"
							disabled={props.user.mail.length}
							update={mail => this.update({mail})}
							error={state.mail_error}
							keyboard_options={{
								scroll: this.scroll,
								offset: this.inputs.mail.offset,
							}}
						/>
						<Select
							title="Выберите центр выдачи"
							empty_title='Центров выдачи этого приза нет'
							value={state.center}
							data={center_list}
							update={center => this.update({center})}
							error={state.center_error}
						/>
					</View>
				</View>
				<View style={styles.map_area}>
					<View style={styles.map}>
						<YandesMaps list={props.list} />
					</View>
					<TouchableOpacity style={styles.save} onPress={this.send}>
						<Text style={styles.save_text}>Отправить</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
})
