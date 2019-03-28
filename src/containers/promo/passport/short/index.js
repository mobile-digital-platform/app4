import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request as promo_request}		from '../../../../redux/reducers/promo';
import {request as settings_request}	from '../../../../redux/reducers/settings';

import alert	from '../../../../services/alert';
import st		from '../../../../services/storage';

import Layout	from './layout';

export default withNavigation(class PromoGetPrizeByMailComponent extends Component {
	constructor(props) {
		super(props);

		this.promo_id		= this.props.promo_id;
		this.get_type		= this.props.get_type;
		this.user_data_type	= this.props.user_data_type;

		this.state = {
			error: '',
			save_state: 'initial',
		};
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
			birthday:	data.birthday+' 00:00:00',
			address:	data.address,
		});
		if(registration_data.response) {
			let obj = {
				name:   	data.name,
				father: 	data.father,
				family: 	data.family,
				mail:	 	data.mail,
				birthday:	data.birthday,
				passport: {
					...this.props.user.passport,
					address: data.address,
				},
			};

			// Сохраняем
			this.props.update_user(obj);

			// В асинхронное хранилище изменения тоже записываем
			st.merge('user',obj);
		}
		if(registration_data.error) {
			await alert("Ошибка",registration_data.error.message);
			this.setState({save_state:'errored'});
			return;
		}

		// ЦВП
		if(this.props.get_type == 1) {
			let center_data = await promo_request.set_prize_center({
				promo_id: this.promo_id,
				user_id: this.props.user.id,
				center: this.props.user.center,
			});
			if(center_data.response) {
			}
			if(center_data.error) {
				await alert("Ошибка",address_data.error.message);
				this.setState({save_state:'errored'});
				return;
			}

		// Доставка
		} else if(this.props.get_type == 2) {
			let address_data = await settings_request.set_delivery_address({
				promo_id: this.promo_id,
				user_id: this.props.user.id,
				...this.props.user.address_obj,
			});
			if(address_data.response) {
			}
			if(address_data.error) {
				await alert("Ошибка",address_data.error.message);
				this.setState({save_state:'errored'});
				return;
			}
		}

		this.setState({save_state:'succeed'});
	}

	back = () => {
		if(this.state.save_state == 'succeed') this.props.navigation.navigate('promo_my_prizes');
	}

	render() {
		// console.log("Short Passport Data Component",this.props);

		return (
			<Layout
				{...this.props}
				state={this.state.save_state}
				send_data={this.send_data}
				button_on_end={this.back}
			/>
		);
	}
});
