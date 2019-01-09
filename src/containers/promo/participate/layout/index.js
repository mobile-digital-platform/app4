import React,{Component} from 'react';
import {Dimensions,Keyboard,Linking,StyleSheet,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import Input		from '../../../../templates/input';
import InputPhone	from '../../../../templates/input_phone';
import InputCard	from '../../../../templates/input_card';
import SelectCity	from '../../../../templates/select_city';
import SubTitle		from '../../../../templates/subtitle';

import promo_date_diff from '../../../../services/promo_date_diff';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		padding: 20, paddingTop: 50,
		backgroundColor: '#000',
	},
	title: {
		marginBottom: 10,
		color: '#fff',
		fontSize: 24, fontFamily: 'GothamPro-Bold',
		textShadowRadius: 5, textShadowColor: '#111',
	},
	ending: {
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro',
		textShadowRadius: 5, textShadowColor: '#111',
	},
	retailer_area: {
		alignItems: 'flex-end',
		width: '100%',
		marginTop: -25, marginBottom: -15,
		paddingRight: 10,
		zIndex: 1,
	},
	retailer_image: {
		height: 40, width: 40,
		borderRadius: 20,
		backgroundColor: '#eee',
	},

	authorization: {
		paddingVertical: 20, paddingHorizontal: 40,
		backgroundColor: '#f1f1f1',
	},
	authorization_text: {
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
	authorization_link: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	authorization_link_text: {
		marginBottom: 3,
		fontSize: 16, fontFamily: 'GothamPro-Medium',
	},

	area: {
		padding: 20,
	},
	block: {
		paddingBottom: 20,
	},

	loyalty_card_block: {
		padding: 20,
		borderRadius: 20,
		backgroundColor: '#f4f4f4',
	},
	loyalty_card_text: {
		marginBottom: 10,
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 16,
	},

	agreement_block: {
		padding: 20,
	},
	agreement_text: {
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
	agreement_link: {
		color: '#f40000',
	},

	button: {
		marginBottom: 10, padding: 15,
		borderRadius: 40,
		backgroundColor: 'red',
	},
	button_text: {
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
	},
	button_disabled: {
		marginVertical: 10, padding: 15,
		borderRadius: 100,
		backgroundColor: '#f4f4f4',
	},
	button_disabled_text: {
		color: '#999',
		fontSize: 18, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
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
				offset: 0,
			},
			father: {
				ref: React.createRef(),
				offset: 100,
			},
			family: {
				ref: React.createRef(),
				offset: 200,
			},
			phone: {
				ref: React.createRef(),
				offset: 300,
			},
			mail: {
				ref: React.createRef(),
				offset: 400,
			},
			city: {
				ref: React.createRef(),
				offset: 300,
			},
			loyalty_card: {
				ref: React.createRef(),
				offset: 600,
			},
		}

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
			loyalty_card_number: '',

			updated: false,
			ready: false,
			waiting: false,
		};
	}

	async componentDidMount() {
		await this.setState(this.props.user);
		let loyalty_card_number = this.find_loyalty_card()?.number;
		if(loyalty_card_number && loyalty_card_number != this.state.loyalty_card_number) await this.setState({loyalty_card_number});
		await this.check_ready();
	}
	async componentDidUpdate(prev_props) {
		if(!Object.is(this.props.user,prev_props.user)) {
			await this.setState(this.props.user);
			let loyalty_card_number = this.find_loyalty_card()?.number;
			if(loyalty_card_number && loyalty_card_number != this.state.loyalty_card_number) await this.setState({loyalty_card_number});
			await this.check_ready();
		}
	}

	// Нахождение карты лояльности у пользователя
	find_loyalty_card = () => this.props.user.loyalty_card.find(e => e.retailer_id==this.props.data.retailer.id);

	// Проверка, заполнены ли все необходимые поля
	check_ready = async () => {
		let ready = !!(
			this.state.name.length &&
			this.state.phone.length &&
			this.state.city_id
		);
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
		console.log("participate component",state);

		if(!data.image_url) data.image_url = 'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg';

		data = promo_date_diff(data);

		return (
			<View style={styles.container}>
				<ImageBackground style={styles.banner} imageStyle={{opacity:0.7}} source={{uri:data.image_url}}>
					<Text style={styles.title}>{data.title.toUpperCase()}</Text>
				</ImageBackground>
				<View style={styles.retailer_area}>
					<Image style={styles.retailer_image} source={{uri:data.retailer.image_url}} />
				</View>
				<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
					{!user.id ? (
						<View style={styles.authorization}>
							<Text style={styles.authorization_text}>
								Если у вас уже есть учетная запись, авторизуйтесь, и все ваши данные будут заполнены автоматически.
							</Text>
							<TouchableOpacity style={styles.authorization_link} onPress={_=>navigation.push('settings_authorization')}>
								<Text style={styles.authorization_link_text}>Авторизация</Text>
								<Icon name="chevron-right" style={{color:'red'}} size={40} />
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
						<View style={styles.loyalty_card_block}>
							<SubTitle style={{paddingBottom:10}} text="Карта лояльности" />
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
						<View style={styles.agreement_block}>
							<Text style={styles.agreement_text}>
								Кликая на "Я участвую!", Вы соглашаетесь
								<Text style={styles.agreement_link} onPress={_=>Linking.openURL(data.site_link)}>
									 с политикой безопасности и конфиденциальности 
								</Text>
								и подтверждаете, что согласны
								<Text style={styles.agreement_link} onPress={_=>Linking.openURL(data.rules_link)}> с правилами акции</Text>.
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
