import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request} from '../../../redux/reducers/promo';

import alert from '../../../services/alert';

import Layout from './layout';

export default withNavigation(class PromoGetPrizeComponent extends Component {
	state = {
		data: [],
		loading: false,
	};

	componentDidMount() {
		this.id = this.props.navigation.getParam('id',0);

		this.load_data();
	}

	load_data = async () => {
		let {response,error} = await request.get_user_prizes({user_id:this.props.user.id,promo_id:this.id});
		if(response) {
			console.log(response);
		}
		if(error) {
			alert("Не удалось загрузить данные",error.code);
		}
	}

	render() {
		// console.log("Get Prize Component",this.props);

		return (
			<Layout {...this.state} />
		);
	}
});
