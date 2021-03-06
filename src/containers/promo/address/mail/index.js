import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request}	from '../../../../redux/reducers/settings';

import alert		from '../../../../services/alert';
import st			from '../../../../services/storage';

import Layout		from './layout';

export default withNavigation(class PromoGetPrizeByMailComponent extends Component {
	constructor(props) {
		super(props);

		this.promo_id		= this.props.promo_id;
		this.get_type		= this.props.get_type;
		this.user_data_type	= this.props.user_data_type;
	}

	send_data = async (data) => {
		let registration_data = await request.set_registration_data({
			promo_id:	this.promo_id,
			user_id:	this.props.user.id,
			name:   	data.name,
			father: 	data.father,
			family: 	data.family,
			mail:	 	data.mail,
			birthday:	data.birthday+' 00:00:00',
			address: 	data.address,
		});
		if(registration_data.response) {
		}
		if(registration_data.error) {
			alert("Ошибка",registration_data.error.message);
			return;
		}

		let address_data = await request.set_delivery_address({
			promo_id: this.promo_id,
			user_id: this.props.user.id,
			...data.address_obj,
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
		console.log("Get Prize By Mail Component",this.props);

		return (<Layout {...this.props} send_data={this.send_data} />);
	}
});
