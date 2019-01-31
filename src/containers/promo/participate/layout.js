import React,{Component} from 'react';
import {Dimensions,Keyboard,Linking,Platform,StyleSheet,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Arrow		from '../../../../assets/ui/right_arrow.png';

import Input		from '../../../templates/input';
import InputPhone	from '../../../templates/input_phone';
import InputCard	from '../../../templates/input_card';
import SelectCity	from '../../../templates/select_city';
import SubTitle		from '../../../templates/subtitle';

import promo_date_diff from '../../../services/promo_date_diff';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		justifyContent: 'flex-end',
		height: 120,
		padding: 20, paddingBottom: 10,
		backgroundColor: '#000',
	},
	title: {
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro-Medium',
		textShadowRadius: 5, textShadowColor: '#111',
		lineHeight: 21,
	},
	ending: {
		color: '#fff',
		fontSize: 14,
		textShadowRadius: 5, textShadowColor: '#111',
	},
	retailer_area: {
		alignItems: 'flex-end',
		width: '100%',
		marginTop: -30, marginBottom: -10,
		paddingRight: 10,
		zIndex: 1,
	},
	retailer_image: {
		height: 40, width: 40,
		borderRadius: 20,
		backgroundColor: '#eee',
	},

	authorization: {
		paddingVertical: 18, paddingHorizontal: 40,
		backgroundColor: '#f4f4f4',
	},
	authorization_text: {
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
	authorization_link: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 9,
	},
	authorization_link_text: {
		marginTop: 2,
		fontSize: 12, fontFamily: 'GothamPro-Medium',
		lineHeight: 16,
	},
	authorization_link_arrow: {
		height: 20, width: 20,
	},

	area: {
		padding: 20,
	},
	block: {
		paddingBottom: 20,
	},

	loyalty_card_block: {
		marginBottom: 20,
		padding: 20,
		borderRadius: 25,
		backgroundColor: '#f4f4f4',
	},
	loyalty_card_text: {
		marginBottom: 10,
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 16,
	},

	agreement_block: {
		padding: 20, paddingTop: 0,
	},
	agreement_text: {
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 14,
	},
	agreement_link: {
		color: '$red',
	},

	button: {
		marginBottom: 10, padding: 15,
		borderRadius: 40,
		backgroundColor: '$red',
	},
	button_text: {
		color: '#fff',
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
		lineHeight: 19,
	},
	button_disabled: {
		marginVertical: 10, padding: 15,
		borderRadius: 40,
		backgroundColor: '#f4f4f4',
	},
	button_disabled_text: {
		color: '#e0e0e0',
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
		lineHeight: 19,
	},
});

export default withNavigation(class Participate extends Component {
	constructor(props) {
		super(props);

		let window = Dimensions.get('window');

		// Ссылки на элементы и отступы, чтобы прокручивать экран на нужную высоту
		this.scroll = React.createRef();
		this.inputs = {
			name: {
				ref: React.createRef(),
				offset: (  0+(props.user.id ? 0 : 113))*EStyleSheet.value("$scale"),
			},
			father: {
				ref: React.createRef(),
				offset: (50+(props.user.id ? 0 : 113))*EStyleSheet.value("$scale"),
			},
			family: {
				ref: React.createRef(),
				offset: (100+(props.user.id ? 0 : 113))*EStyleSheet.value("$scale"),
			},
			phone: {
				ref: React.createRef(),
				offset: (200+(props.user.id ? 0 : 113))*EStyleSheet.value("$scale"),
			},
			mail: {
				ref: React.createRef(),
				offset: (250+(props.user.id ? 0 : 113))*EStyleSheet.value("$scale"),
			},
			city: {
				ref: React.createRef(),
				offset: (300+(props.user.id ? 0 : 113))*EStyleSheet.value("$scale"),
			},
			loyalty_card: {
				ref: React.createRef(),
				offset: (450+(props.user.id ? 0 : 113))*EStyleSheet.value("$scale"),
			},
		};

		this.state = {
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
			loyalty_card_number: '',

			updated: false,
			ready: false,
			waiting: false,
		};
	}

	async componentDidMount() {
		if(this.props.user.id) {
			await this.setState(this.props.user);
			if(this.props.data.retailer.has_loyalty_card) {
				let loyalty_card_number = this.find_loyalty_card()?.number;
				if(loyalty_card_number && loyalty_card_number != this.state.loyalty_card_number) await this.setState({loyalty_card_number});
			}
		}
		await this.check_ready();
	}
	async componentDidUpdate(prev_props) {
		if(!Object.is(this.props.user,prev_props.user)) {
			await this.setState(this.props.user);
			if(this.props.data.retailer.has_loyalty_card) {
				let loyalty_card_number = this.find_loyalty_card()?.number;
				if(loyalty_card_number && loyalty_card_number != this.state.loyalty_card_number) await this.setState({loyalty_card_number});
			}
			await this.check_ready();
		}
	}

	// Нахождение карты лояльности у пользователя
	find_loyalty_card = () => this.props.user.loyalty_card.find(e => e.retailer_id==this.props.data.retailer.id);

	// Проверка, заполнены ли все необходимые поля
	check_ready = async () => {
		let state = this.state;

		let ready = !!(
			state.name.length &&
			state.phone.length &&
			state.city_id
		);
		if(state.name.length && state.name_error.length)	await this.setState({name_error:''});
		if(state.phone.length && state.phone_error.length)	await this.setState({phone_error:''});
		if(state.city_id && state.city_error.length)		await this.setState({city_error:''});
		await this.setState({ready});
	}
	// Указание на ошибки при заполнении полей
	check_completeness = async () => {
		await this.check_ready();
		if(!this.state.ready) {
			// Проверяем имя
			if(!this.state.name.length) {
				this.scroll.current.scrollTo({y:this.inputs.name.offset});
				this.setState({name_error:'Введите имя'});
				return false;
			} else {
				await this.setState({name_error:''});
			}
			// Проверяем номер телефона
			if(!this.state.phone.length) {
				this.scroll.current.scrollTo({y:this.inputs.phone.offset});
				this.setState({phone_error:'Введите номер телефона'});
				return false;
			} else {
				await this.setState({phone_error:''});
			}
			// Проверяем город
			if(!this.state.city_id) {
				this.scroll.current.scrollTo({y:this.inputs.city.offset});
				this.setState({city_error:'Выберите город'});
				return false;
			} else {
				await this.setState({city_error:''});
			}
		}
		return true;
	}

	// Внесение изменений из полей
	update = async (state_adjust) => {
		await this.setState({...state_adjust,updated:true});
		this.props.update_user(state_adjust);
		this.check_ready();
	}
	// Отправка формы
	send = async () => {
		Keyboard.dismiss();
		if(this.state.waiting) return;

		// Проверяем все поля
		if(!await this.check_completeness()) return;

		if(this.state.id && !this.state.phone_confirmed) {
			this.scroll.current.scrollTo({y:this.inputs.phone.offset});
			return;
		}

		// Если все в порядке, отсылаем
		if(this.state.ready) {
			await this.setState({waiting:true});
			await this.props.send_data({
				name:			this.state.name,
				father:			this.state.father,
				family:			this.state.family,
				gender:			this.state.gender,
				city_id:		this.state.city_id,
				city_name:		this.state.city_name,
				phone:			this.state.phone,
				mail:			this.state.mail,
				loyalty_card_number: this.state.loyalty_card_number,
			});
			await this.setState({waiting:false});
		}
	}

	render() {
		let {navigation,data,user} = this.props;
		let state = this.state;
		// console.log("participate component",data);

		if(!data.image_url) data.image_url = 'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg';

		data = promo_date_diff(data);

		return (
			<View style={styles.container}>
				<ImageBackground style={styles.banner} imageStyle={{opacity:0.5}} source={{uri:data.image_url}}>
					<Text style={styles.title}>{data.title.toUpperCase()}</Text>
				</ImageBackground>
				{data.retailer.image_url ? (
				<View style={styles.retailer_area}>
					<Image style={styles.retailer_image} source={{uri:data.retailer.image_url}} />
				</View>
				) : null}
				<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
					{!user.id ? (
						<View style={styles.authorization}>
							<Text style={styles.authorization_text}>
								Если у вас уже есть учетная запись, авторизуйтесь, и все ваши данные будут заполнены автоматически.
							</Text>
							<TouchableOpacity style={styles.authorization_link} onPress={_=>navigation.push('settings_authorization')}>
								<Text style={styles.authorization_link_text}>Авторизация</Text>
								<Image style={styles.authorization_link_arrow} source={Arrow} />
							</TouchableOpacity>
						</View>
					) : null}
					<View style={styles.area}>
						<View style={styles.block}>
							<Input
								id={this.inputs.name.ref}
								title="Имя"
								value={state.name}
								update={value => this.update({name:value})}
								send={value => this.setState({name:value})}
								error={state.name_error}
								keyboard_options={{
									scroll: this.scroll,
									offset: this.inputs.name.offset,
								}}
							/>
							<Input
								title="Отчество"
								value={state.father}
								update={value => this.update({father:value})}
								send={value => this.setState({father:value})}
								keyboard_options={{
									scroll: this.scroll,
									offset: this.inputs.father.offset,
								}}
							/>
							<Input
								title="Фамилия"
								value={state.family}
								update={value => this.update({family:value})}
								send={value => this.setState({family:value})}
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
								disabled={state.id && state.phone_confirmed}
								need_confirm={state.id && !state.phone_confirmed}
								update={value => this.update({phone:value})}
								send={value => this.setState({phone:value})}
								error={state.phone_error}
								keyboard_options={{
									scroll: this.scroll,
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
									scroll: this.scroll,
									offset: this.inputs.mail.offset,
								}}
							/>
							<SelectCity
								id={this.inputs.city.ref}
								value={state.city_id}
								name={state.city_name}
								send={value => this.setState({city:value})}
								error={!state.city_id && state.city_error}
							/>
						</View>
						{data.retailer.has_loyalty_card ? (
						<View style={styles.loyalty_card_block}>
							<SubTitle style={{marginTop:-2,paddingTop:0,paddingBottom:10}} text="Карта лояльности" />
							<Text style={styles.loyalty_card_text}>
								Если у вас есть карта лояльности, то покупки по ней будут автоматически участвовать в акции.
							</Text>
							<InputCard
								title="Номер карты лояльности"
								value={state.loyalty_card_number}
								update={value => this.update({loyalty_card_number:value})}
								send={value => this.setState({loyalty_card_number:value})}
								keyboard_options={{
									scroll: this.scroll,
									offset: this.inputs.loyalty_card.offset,
								}}
							/>
						</View>
						) : null}
						<View style={styles.agreement_block}>
							<Text style={styles.agreement_text}>
								Кликая на "Я участвую!", Вы соглашаетесь
								<Text style={styles.agreement_link} onPress={_=>data.site_link&&Linking.openURL(data.site_link)}>
									 с политикой безопасности и конфиденциальности 
								</Text>
								и подтверждаете, что согласны
								<Text style={styles.agreement_link} onPress={_=>data.rules_link&&Linking.openURL(data.rules_link)}> с правилами акции</Text>.
							</Text>
						</View>
						<TouchableOpacity style={state.ready ? styles.button : styles.button_disabled} onPress={this.send}>
							<Text style={state.ready ? styles.button_text : styles.button_disabled_text}>Я участвую!</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
});
