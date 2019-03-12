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
			loading: false,
			save_state: 'initial',
		};
	}

	componentDidMount() {
		this.get_prize_center_list();
	}

	get_prize_center_list = async () => {
		this.setState({loading:true});
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
		this.setState({loading:false});
	}

	send_data = async (data) => {
		this.setState({save_state:'waiting'});

		let registration_data = await settings_request.set_registration_data({
			promo_id:	this.promo_id,
			user_id:	this.props.user.id,
			name:   	data.name,
			father: 	data.father,
			family: 	data.family,
			mail:	 	data.mail,
			birthday:	this.props.user.birthday,
		});
		if(registration_data.response) {
		}
		if(registration_data.error) {
			await alert("Ошибка",registration_data.error.message);
			this.setState({save_state:'errored'});
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
			await alert("Ошибка",address_data.error.message);
			this.setState({save_state:'errored'});
			return;
		}

		// Сохраняем
		this.props.update_user(data);

		// В асинхронное хранилище изменения тоже записываем
		st.merge('user',data);

		// Если ошибок нет, то все успешно!
		await this.setState({save_state:'succeed'});
	}
	next = () => {
		this.props.navigation.push('promo_passport',{promo_id:this.promo_id,user_data_type:this.user_data_type});
	}

	render() {
		// console.log("Get Prize Center Component",this.props);

		return (
			<Layout
				{...this.props}
				loading={this.state.loading}
				list={this.state.list}
				state={this.state.save_state}
				send_data={this.send_data}
				button_on_end={this.next}
			/>
		);
	}
});
