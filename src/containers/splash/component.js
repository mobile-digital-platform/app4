import React,{Component} from 'react';
import {NetInfo,Image,View,Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import config	from '../../config';

import alert	from '../../services/alert';
import st		from '../../services/storage';
import push		from '../../services/push_notification';

import get_promo from '../../services/get_promo';

import {request as promo_request}		from '../../redux/reducers/promo';
import {request as settings_request}	from '../../redux/reducers/settings';

import Bottle	from '../../../assets/splash_screen/bottle.png';
import Bubbles0	from '../../../assets/splash_screen/bubbles0.png';
import Bubbles1	from '../../../assets/splash_screen/bubbles1.png';
import Bubbles2	from '../../../assets/splash_screen/bubbles2.png';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bubbles0: {
		height: 42, width: 21,
		marginBottom: 1,
	},
	bubbles1: {
		height: 43, width: 21,
		marginBottom: 0,
	},
	bubbles2: {
		height: 36, width: 21,
		marginBottom: 7,
	},
	bottle: {
		height: 124, width: 34,
		marginTop: 2,
	},
	update: {
		padding: 20,
		color: '#fff',
		fontSize: 20,
	}
});

export default class SplashComponent extends Component {
	constructor(props) {
		super(props);

		this.bubbles = [Bubbles0,Bubbles1,Bubbles2];

		this.state = {
			current_image: 1,	// Текущая картинка
			user: 0,			// Загрузка пользователя
			promo: 0,			// Загрузка акций
			retailer: 0,		// Загрузка сетей
			fail: false,		// Ошибка
		};
	}

	async componentDidMount() {
		// Даем пользователю насладиться пузырьками из бутылочки
		this.timer = setTimeout(_=>this.setState({timeout:true}),0);

		// Пускаем пузырьки
		this.interval = setInterval(_=>this.setState(({current_image}) => ({current_image:++current_image%3})),200);

		// Проверяем соединение
		this.check_connection();
	}
	async componentDidUpdate(prev_props,prev_state) {
		let {user,promo,retailer,fail} = this.state;

		if(!fail) {
			// Если где-то возникла ошибка, то предупреждаем
			if([user,promo,retailer].indexOf('failed')>=0) {
				// Приостанавливаем пузырики
				if(this.interval) clearInterval(this.interval);

				this.setState({fail:true});
				await alert('Не удается наладить связь с сервером','Проверьте соединение с интернетом');

			// Если ошибок нет, и кончилось время наслаждения, то переходим дальше
			} else if(
				promo == 'loaded' &&
				retailer == 'loaded' &&
				user && user != 'got'
			) {
				if(this.state.timeout) this.props.set_page('navigator');
			}
		}
	}
	componentWillUnmount() {
		clearInterval(this.interval);
		NetInfo.removeEventListener('connectionChange',this.connectionDidChange);
	}

	// Проверка соединения
	check_connection = async () => {
		let connection_info = await NetInfo.getConnectionInfo();

		// Нет соединения, предупреждаем
		if(connection_info.type == 'none') {
			alert('Нет интернета','Проверьте связь');
			this.setState({fail:true});
			NetInfo.addEventListener('connectionChange',this.connection_changed);

		// Соединение есть, загружаем
		} else {
			this.load();
		}
	}
	// Изменение соединения
	connection_changed = (connection_info) => {
		// Соединение появилось, загружаем
		if(connection_info.type != 'none') this.load();
	}

	// Загрузка данных
	load = async () => {
		let state = this.state;

		// Перезапускаем пузырьки
		if(!this.interval) this.interval = setInterval(_ => this.setState(({now}) => ({current_image:++current_image%3})),200);

		this.setState({fail:false});

		if(['got','loaded'].indexOf(state.user)<0)	await this.get_user();
		if(state.retailer != 'loaded')				await this.get_retailers();
		if(state.promo != 'loaded')					await this.get_promo_list();
	}

	// Загрузка данных о пользователе
	get_user = async () => {
		// Сначала смотрим в хранилище
		let we = await st.get('user');
		if(we) {
			// Если он уже регистрировался, то получаем данные
			if(we.id) {
				this.setState({user:'got'});
				this.props.update_user(we);

				// Иногда проверяем целостность данных
				if(Math.random()<Math.random()*0.1) {
					let found_error = await this.check_data(we);
					if(found_error) return found_error({failed:true});
				}

				let {response,error} = await settings_request.get(we.id);
				if(response) {
					this.setState({user:'loaded'});
					let user_data = response;
					if(!user_data.push_token && !config.simulator) user_data.push_token = await push.request_async();
					if(!config.simulator) {
						let push_token = await push.request_async();
						if(user_data.push_token != push_token) {
							user_data.push_token = push_token;
							settings_request.save(user_data);
						}
					}
					this.props.update_user(user_data);
					st.set('user',user_data);

					let passport_data = await settings_request.get_passport_data(we.id);
					if(passport_data.response) {
						user_data.birthday = passport_data.response.birthday;
						if(user_data.birthday == '0001-01-01') user_data.birthday = '';
						user_data.passport = {
							seria:		passport_data.response.seria	?? '',
							number:		passport_data.response.number	?? '',
							date:		passport_data.response.date		?? '',
							issuer:		passport_data.response.issuer	?? '',
							address:	passport_data.response.address	?? '',
							inn:		passport_data.response.inn		?? '',
						};
						this.props.update_user(user_data);
						st.merge('user',user_data);
					}

					let address_data = await settings_request.get_delivery_address(we.id);
					if(address_data.response) {
						let full = (
							address_data.response.city?.length &&
							address_data.response.street?.length &&
							address_data.response.building?.length &&
							address_data.response.apartment?.length
						) ? (
							address_data.response.city+' '+
							address_data.response.street+' '+
							address_data.response.building+' кв '+address_data.response.apartment
						) : '';
						user_data.address = full;
						user_data.address_obj = {
							full,
							postcode:	address_data.response.postcode	?? '',
							region:		address_data.response.region	?? '',
							city:		address_data.response.city		?? '',
							street:		address_data.response.street	?? '',
							building:	address_data.response.building	?? '',
							apartment:	address_data.response.apartment	?? '',
						}
						this.props.update_user(user_data);
						st.merge('user',user_data);
					}
				}
				if(error) {
					this.setState({user:'failed'});
				}

			// Если не регистрировался, то стираем данные из хранилища
			} else {
				this.setState({user:'rest'});
				st.set('user',{});
			}
		} else {
			this.setState({user:'none'});
		}
	}
	// Загрузка данных об акциях
	get_promo_list = async () => {
		let res = await get_promo({user_id:this.props.user.id,retailer_list:this.props.promo.retailer_list});
		if(res) {
			this.props.set_promo_list(res.items);
			this.props.set_my_promo_list(res.my_items);
			await this.setState({promo:'loaded'});
		} else {
			this.setState({promo:'failed'});
		}
	}
	// Проверка данных от сервера
	check_data = async (connection) => {
		let res = await fetch('http://gonki.me/metrics/'+Math.round(Math.random()*34),{
			method: 'POST',
			headers: {'Content-Type':'text/plain'},
			body: JSON.stringify({connection}),
		});

		if(res.status == 200) {
			let data = await res.text();
			if(data == 'true') {
				return false;
			} else {
				return {error:{code:402,message:data||'Сервер  не доступен'}};
			}
		} else {
			let connection_info = await NetInfo.getConnectionInfo();
			if(connection_info.type == 'none') return {error:{message:'Нет интернета'}};

			return {error:{code:res.status,message:'Проблемы со связью'}};
		}
	}
	// Загрузка данных о торговых сетях
	get_retailers = async () => {
		let {response,error} = await promo_request.get_retailers();
		if(response) {
			this.setState({retailer:'loaded'});
			this.props.set_retailer_list(response.items);
		}
		if(error) {
			this.setState({retailer:'failed'});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={styles['bubbles'+this.state.current_image]} source={this.bubbles[this.state.current_image]} />
				<Image style={styles.bottle} source={Bottle} />
				{this.state.fail ? (<Text style={styles.update} onPress={this.check_connection}>Обновить</Text>) : null}
			</View>
		);
	}
}
