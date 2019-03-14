import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request}	from '../../../redux/reducers/settings';

import st			from '../../../services/storage';

import LayoutFull	from './full';
import LayoutShort	from './short';

export default withNavigation(class PassportComponent extends Component {
	constructor(props) {
		super(props);

		this.promo_id		= props.navigation.getParam('promo_id',0),
		this.get_type		= props.navigation.getParam('get_type',1),
		this.user_data_type	= props.navigation.getParam('user_data_type',1);
	}

	componentDidMount() {
		if(!this.props.user.passport.address.length) {
			this.get_data();
		}
	}

	get_data = async () => {
		let passport_data = await request.get_passport_data(this.props.user.id);
		if(passport_data.response) {
			user_data = {};

			user_data.birthday = passport_data.response.birthday;
			if(user_data.birthday == '0001-01-01') user_data.birthday = '';

			user_data.passport = {
				seria:		passport_data.response.seria	?? '',
				number:		passport_data.response.number	?? '',
				date:		passport_data.response.date		?? '',
				issuer:		passport_data.response.issuer	?? '',
				address:	passport_data.response.address	?? '',
				inn:		passport_data.response.inn		?? '',
			};
			if(user_data.passport.date == '0001-01-01') user_data.passport.date = '';

			this.props.update_user(user_data);
			st.merge('user',user_data);
		}
	}

	render() {
		if(this.promo_id) {
			if(this.user_data_type == 1) {
				return (<LayoutShort	{...this.props} {...{promo_id:this.promo_id,get_type:this.get_type,user_data_type:this.user_data_type}} />);
			} else if(this.user_data_type == 2) {
				return (<LayoutFull		{...this.props} {...{promo_id:this.promo_id,get_type:this.get_type,user_data_type:this.user_data_type}} />);
			}
		}
		return null;
	}
});
