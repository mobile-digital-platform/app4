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
			promo_id: this.promo_id,
			user_id: this.props.user.id,
			...data,
		});
		if(registration_data.response) {
			let obj = {
				mail:	 	data.mail,
				birthday:	data.birthday,
				passport: {
					...this.props.user.passport,
					address: data.address,
				},
			};

			// Сохраняем
			this.props.update_user(data);

			// В асинхронное хранилище изменения тоже записываем
			st.merge('user',data);

			this.props.navigation.goBack();
		}
		if(registration_data.error) {
			alert("Ошибка",registration_data.error.message);
			return;
		}
	}

	render() {
		console.log("Get Prize On EMail Component",this.props);

		return (<Layout {...this.props} send_data={this.send_data} />);
	}
});
