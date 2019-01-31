import React,{Component} from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import alert	from '../../../services/alert';
import st		from '../../../services/storage';

import {request as promo_request}		from '../../../redux/reducers/promo';
import {request as settings_request}	from '../../../redux/reducers/settings';

import Layout from './layout';

export default withNavigation(class PromoParticipateComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.navigation.getParam('data',null),
			participated: false,
		};
	}

	componentDidMount() {
		// Если вдруг он уже участвует в этой акции
		if(this.props.user.id) this.check_if_entered();
	}
	componentDidUpdate(prev_props) {
		// Подтвердил номер телефона и исправил все ошибки
		if(
			prev_props.user.id && (
				!prev_props.user.name.length ||
				!prev_props.user.city_id ||
				!prev_props.user.phone.length ||
				!prev_props.user.phone_confirmed
			) &&
			this.props.user.id &&
			this.props.user.name.length &&
			this.props.user.city_id &&
			this.props.user.phone.length &&
			this.props.user.phone_confirmed &&
			!this.state.participated
		) {
			this.setState({participated:true});
			this.send();
		}
		// Если он войшел в профиль, и оказывается, что уже участвует в этой акции
		if(this.props.user.id) this.check_if_entered();
	}

	check_if_entered() {
		if(this.props.promo.my_promo_list.length) {
			let existing = this.props.promo.my_promo_list.find(e => e.id==this.state.data.id);
			if(existing) {
				this.props.navigation.replace('promo_my_view',{id:this.state.data.id});
			}
		}
	}

	// Добавление карты лояльности
	add_loyalty_card = async (number) => {
		// А вдруг она у него уже есть?
		let existing = this.props.user.loyalty_card.find(e => e.retailer_id==this.state.data.retailer.id);

		// Если он поменял номер, то надо удалить старую
		if(existing) {
			let {response,error} = await settings_request.remove_loyalty_card({
				user_id:		this.props.user.id,
				retailer_id:	this.state.data.retailer.id,
			});
			if(response) this.props.remove_loyalty_card({id:this.state.data.retailer.id});
			if(error) {
				// await alert('Не вышло удалить карту',error.message);
				// Ну если не вышло, то и хрен с ней...
			}
		}

		// Добавлем новую
		let obj = {
			retailer_id: this.state.data.retailer.id,
			number,
		};
		let {response,error} = await settings_request.add_loyalty_card({
			...obj,
			user_id: this.props.user.id,
		});
		if(response) this.props.add_loyalty_card(obj);
		if(error) {
			// await alert("Ошибка","Не удалось добавить карту");
			// Не удалось, ну и ладно.
		}
	}

	participate = async () => {
		let {response,error} = await promo_request.participate({
			user_id: this.props.user.id,
			promo_id: this.state.data.id,
		});
		if(response) {
			// this.props.add_my_promo(this.state.data);
			await this.get_promo_list(this.props.user.id,this.state.data.id);
			this.props.navigation.navigate('promo_list',{page:1/*,scroll_to:this.state.data.id*/});
		}
		if(error) {
			await alert('Не удалось зарегистрироваться в акции');
		}
	}

	register = async (data) => {
		let {response,error} = await settings_request.register(data);
		if(response) {
			// Записываем его ид, полученный с сервера
			let id = response.user_id;
			this.props.update_user({id});

			// В асинхронное хранилище изменения тоже записываем
			st.merge('user',{...data,id});

			// Отправляем на экран подтверждения телефона
			await alert('Поздравляем, вы успешно зарегистрировались','Подтвердите свой номер телефона');
			this.props.navigation.push('settings_confirm_phone');
		}
		if(error) {
			await alert('Регистрация не удалась',error.message);
		}
	}

	send = async (data) => {
		this.props.open_smoke();

		if(data) await this.setState({user:data});

		// Если он уже вошел
		if(this.props.user.id) {
			// Учитываем карту лояльности
			if(this.state.user.loyalty_card_number) await this.add_loyalty_card(this.state.user.loyalty_card_number);

			// Записываем в акцию
			await this.participate();

		// Если он еще не входил, то регистрируем его
		} else {
			await this.register(data);
		}
		this.props.close_smoke();
	}

	// Загрузка данных об акциях, это тут на время
	get_promo_list = async (user_id) => {
		let data = await promo_request.get_list({user_id});
		if(data.response) {
			let items = data.response.items;
			let waiting = [];

			for(let i=0; i<items.length; i++) {
				let row = items[i];

				// Набираем по всем акциям уточнения внутри торговых сетей
				waiting.push(new Promise(async (resolve,reject) => {
					let retailers_data = await promo_request.get_promo_retailers({promo_id:row.id,user_id});
					if(retailers_data.response) {
						items[i].promo_list = retailers_data.response.items.map(e =>({
							...e,
							retailer: this.props.promo.retailer_list.find(g => g.id==e.retailer_id),
						}));
					}
					if(retailers_data.error) {
						this.setState({promo:'failed'});
					}
					resolve();
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

			return true;
		}
		if(data.error) {
			return false;
		}
	}

	render() {
		// console.log("Component Participate",this.state);

		return (
			<Layout
				{...this.props}
				data={this.state.data}
				update_user={this.props.update_user}
				send_data={this.send}
			/>
		);
	}
});
