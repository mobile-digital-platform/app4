import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request}	from '../../../../redux/reducers/settings';

import alert		from '../../../../services/alert';
import st			from '../../../../services/storage';

import Layout		from './layout';

export default withNavigation(class PromoGetPrizeByMailComponent extends Component {
	constructor(props) {
		super(props);

		this.promo_id = this.props.promo_id;
		this.get_type = this.props.get_type;

		this.state = {
		};
	}

	send_data_by_mail = async (data) => {
		let registration_data = await request.set_registration_data({
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

		let address_data = await request.set_delivery_address({
			promo_id: this.promo_id,
			user_id: this.props.user.id,
			...data.adress_obj,
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

		this.props.navigation.goBack();
	}

	render() {
		console.log("Get Prize By Mail Component",this.props);

		return (<Layout {...this.props} send_data={this.send_data_by_mail} />);
	}
});
