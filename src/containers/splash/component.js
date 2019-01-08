import React,{Component} from 'react';
import {NetInfo,StyleSheet,Image,View,Text} from 'react-native';

import alert	from '../../services/alert';
import st		from '../../services/storage';

import {request as promo_request}		from '../../redux/reducers/promo';
import {request as settings_request}	from '../../redux/reducers/settings';

import Bottle	from '../../../assets/splash_screen/bottle.png';
import Bubbles0	from '../../../assets/splash_screen/bubbles0.png';
import Bubbles1	from '../../../assets/splash_screen/bubbles1.png';
import Bubbles2	from '../../../assets/splash_screen/bubbles2.png';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bubbles0: {marginBottom:1},
	bubbles1: {marginBottom:0},
	bubbles2: {marginBottom:7},
	bottle:   {marginTop:2},
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
		this.timer = setTimeout(_ => this.setState({timeout:true}),0);

		// Пускаем пузырьки
		this.interval = setInterval(_ => this.setState(({current_image}) => ({current_image:++current_image%3})),200);

		// Проверяем соединение
		this.check_connection();
	}
	async componentDidUpdate(prev_props,prev_state) {
		let {user,promo,retailer,fail} = this.state;

		if(!fail) {
			// Если где-то возникла ошибка, то предупреждаем
			if([user,promo,retailer].indexOf('failed')>=0) {
<<<<<<< HEAD
				// Приостанавливаем пузырики
				if(this.interval) clearInterval(this.interval);

				this.setState({fail:true});
				await alert('Не удается наладить связь с сервером');
=======
				await alert('Не удается наладить связь с сервером');
				this.setState({fail:true});

				// Приостанавливаем пузырики
				if(this.interval) clearInterval(this.interval);
>>>>>>> 90cb72bff6426a5f10893161faf26c9b1b2dc4da

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
			alert("Нет интернета");
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
					this.props.update_user(response);
					st.set('user',response);
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
		let data = await promo_request.get_list({user_id:this.props.user.id});
		if(data.response) {
			let items = data.response.items;
			let waiting = [];

			for(let i=0; i<items.length; i++) {
				let row = items[i];

				// Набираем по всем акциям уточнения внутри торговых сетей
				waiting.push(new Promise(async (resolve,reject) => {
					let retailers_data = await promo_request.get_promo_retailers({promo_id:row.id,user_id:this.props.user.id});
					if(retailers_data.response) {
						items[i].promo_list = retailers_data.response.items;
					}
					if(retailers_data.error) {
						this.setState({promo:'failed'});
					}
					resolve()
				}));
			}
			await Promise.all(waiting);

			this.props.set_promo_list(items);

			let my_items = [];
			for(let i=0; i<items.length; i++) {
				let row = items[i];
				for(let j=0; j<row.promo_list.length; j++) {
					let nrow = row.promo_list[j];
					if(nrow.participation) {
						nrow.image_url = row.image_url;
						my_items.push(nrow);
					}
				}
			}
			this.props.set_my_promo_list(my_items);

			this.setState({promo:'loaded'});
		}
		if(data.error) {
			this.setState({promo:'failed'});
		}
	}
<<<<<<< HEAD
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
=======
>>>>>>> 90cb72bff6426a5f10893161faf26c9b1b2dc4da
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
