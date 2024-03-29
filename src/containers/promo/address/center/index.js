import React,{Component} from 'react';
import {FlatList} from 'react-native';
import {withNavigation} from 'react-navigation';

import {request as promo_request}		from '../../../../redux/reducers/promo';
import {request as settings_request}	from '../../../../redux/reducers/settings';

import alert	from '../../../../services/alert';
import st		from '../../../../services/storage';

import Layout	from './layout';

export default withNavigation(class PromoGetPrizeComponent extends Component {
	constructor(props) {
		super(props);

		this.promo_id		= this.props.promo_id;
		this.get_type		= this.props.get_type;
		this.user_data_type	= this.props.user_data_type;

		this.state = {
			list: [],
		};
	}

	componentDidMount() {
		this.get_prize_center_list();
	}

	get_prize_center_list = async () => {
		let {response,error} = await promo_request.get_prize_center_list({
			user_id: this.props.user.id,
			promo_id: this.promo_id,
		});
		if(response) {
			this.setState({list:response.items});
		}
		if(error) {
			await alert("Не удалось загрузить список центров выдачи призов","Зайдите на эту страницу позже");
		}
	}

	send_data = async (data) => {
		let registration_data = await settings_request.set_registration_data({
			promo_id: this.promo_id,
			user_id: this.props.user.id,
			...data,
		});
		if(registration_data.response) {
		}
		if(registration_data.error) {
			alert("Ошибка",registration_data.error.message);
			return;
		}

		let address_data = await promo_request.set_prize_center({
			promo_id: this.promo_id,
			user_id: this.props.user.id,
			center: data.center,
		});
		if(address_data.response) {
		}
		if(address_data.error) {
			alert("Ошибка",address_data.error.message);
			return;
		}

		// Сохраняем
		this.props.update_user(data);

		// В асинхронное хранилище изменения тоже записываем
		st.merge('user',data);

		this.props.navigation.push('promo_passport',{promo_id:this.promo_id,user_data_type:this.user_data_type});
	}

	render() {
		console.log("Get Prize Center Component",this.props);

		return (<Layout {...this.props} list={this.state.list} send_data={this.send_data} />);
	}
});
