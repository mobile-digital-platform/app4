import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request}	from '../../../../redux/reducers/settings';

import alert		from '../../../../services/alert';
import st			from '../../../../services/storage';

import Layout		from './layout';

export default withNavigation(class PromoGetPrizeByMailComponent extends Component {
	state = {
		accessible_address: false,
	}

	componentDidMount() {
		// if(!this.props.user.address_obj.full.length)
		this.load();
	}

	load = async () => {
		let address_data = await request.get_delivery_address(this.props.user.id);
		if(address_data.response) {
			let full = (
				address_data.response.city?.length &&
				address_data.response.street?.length &&
				address_data.response.building?.length
			) ? (
				address_data.response.city+' '+
				address_data.response.street+' '+
				address_data.response.building+
				(address_data.response.apartment ? ' кв '+address_data.response.apartment : '')
			) : '';

			user_data = {
				address: full,
				address_obj: {
					full,
					postcode:	address_data.response.postcode	?? '',
					region:		address_data.response.region	?? '',
					city:		address_data.response.city		?? '',
					street:		address_data.response.street	?? '',
					building:	address_data.response.building	?? '',
					apartment:	address_data.response.apartment	?? '',
				},
			};

			this.props.update_user(user_data);
			st.merge('user',user_data);

			this.setState({accessible_address:full.length});
		}
	}

	next = () => {
		this.props.navigation.push('promo_passport',{
			promo_id:		this.props.promo_id,
			get_type:		this.props.get_type,
			user_data_type:	this.props.user_data_type,
		});
	}

	render() {
		// console.log("Get Prize By Mail Component",this.props);

		return (<Layout {...this.props} accessible_address={this.state.accessible_address} next={this.next} />);
	}
});
