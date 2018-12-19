import React,{Component} from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import Input		from '../../../../templates/input';
import SelectCity	from '../../../../templates/select_city';
import InputPhone	from '../../../../templates/input_phone';

const styles = StyleSheet.create({
	container: {
	},
	banner: {
		padding: 20, paddingTop: 50,
		backgroundColor: '#000',
	},
	title: {
		marginBottom: 10,
		color: '#fff',
		fontSize: 24, fontWeight: 'bold',
		textTransform: 'uppercase',
		textShadowRadius: 5, textShadowColor: '#111',
	},
	subtitle: {
		paddingBottom: 10,
		color: '#bbb',
		fontSize: 16, fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	ending: {
		color: '#fff',
		fontSize: 18,
		textShadowRadius: 5, textShadowColor: '#111',
	},

	authorization: {
		paddingVertical: 20, paddingHorizontal: 40,
		backgroundColor: '#f1f1f1',
	},
	authorization_text: {
		fontSize: 16,
	},
	authorization_link: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	authorization_link_text: {
		marginBottom: 3,
		fontSize: 16, fontWeight: 'bold',
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
		fontSize: 16,
	},

	agreement_block: {
		padding: 20,
	},
	agreement_text: {
		fontSize: 16,
	},
	agreement_link: {
		color: 'red',
	},

	button: {
		marginBottom: 10, padding: 15,
		borderRadius: 40,
		backgroundColor: 'red',
	},
	button_text: {
		color: '#fff',
		fontSize: 20, fontWeight: 'bold',
		textAlign: 'center',
	},
	button_disabled: {
		marginVertical: 10, padding: 15,
		borderRadius: 100,
		backgroundColor: '#f4f4f4',
	},
	button_disabled_text: {
		color: '#999',
		fontSize: 20, fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default withNavigation(class Participate extends Component {
	state = {
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

	componentDidMount() {
		this.setState(this.props.user);
	}
	componentDidUpdate(prev_props) {
		if(!Object.is(this.props.user,prev_props.user)) {
			this.setState(this.props.user);
		}
	}

	render() {
		let {navigation,participation,user} = this.props;
		let state = this.state;
		console.log("participate component",state);

		return (
			<ScrollView style={styles.container}>
				<ImageBackground style={styles.banner} source={{uri:'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg'}}>
					<Text style={styles.title}>{participation.data.title}</Text>
				</ImageBackground>
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
					</View>
					<View style={styles.block}>
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
						<SelectCity
							value={state.city_id}
							name={state.city_name}
							send={value => this.setState({city:value})}
							error={state.city_error}
						/>
					</View>
					<View style={styles.loyalty_card_block}>
						<Text style={styles.subtitle}>Карта лояльности</Text>
						<Text style={styles.loyalty_card_text}>Если у вас есть карта лояльности, то покупки по ней будут автоматически участвовать в акции.</Text>
						<Input title="Номер карты лояльности" />
					</View>
					<View style={styles.agreement_block}>
						<Text style={styles.agreement_text}>
							Кликая на "Я участвую!", Вы соглашаетесь
							<Text style={styles.agreement_link}> с политикой безопасности и конфиденциальности </Text>
							и подтверждаете, что согласны
							<Text style={styles.agreement_link}> с правилами акции</Text>.
						</Text>
					</View>
					<TouchableOpacity style={styles.button_disabled}>
						<Text style={styles.button_disabled_text}>Я участвую!</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
});
