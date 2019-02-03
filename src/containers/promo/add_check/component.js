import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import f from '../../../functions';

import alert from '../../../services/alert';

import {request} from '../../../redux/reducers/promo';

import Layout from './layout';

export default withNavigation(class PromoAddCheckComponent extends Component {
	constructor(props) {
		super(props);

		this.promo_id = props.navigation.getParam('id',0);
	}

	send_data = async (data) => {
		console.log(data);
		let {response,error} = await request.add_check_data({
			user_id:	this.props.user.id,
			promo_id:	this.promo_id,
			datetime:	f.date("Y-m-d H:i:s",data.datetime),
			sum:		data.sum,
			fn:			data.fn,
			fd:			data.fd,
			fp:			data.fp,
		});
		if(response) {
			console.log(response.check_id);
		}
		if(error) {
			alert("Не удалось загрузить данные о чеке",error.message);
		}
	}

	render() {
		return (
			<Layout
				{...this.props}
				send_data={this.send_data}
			/>
		);
	}
});
