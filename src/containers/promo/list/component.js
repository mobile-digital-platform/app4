import React,{Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import {withNavigation} from 'react-navigation';

import Layout		from './layout/list';

import get_promo	from '../../../services/get_promo';

export default withNavigation(class PromoListComponent extends Component {
	state = {
		loading: false,
	};

	componentDidMount() {
		// this.props.navigation.push('help');
	}

	reload = async () => {
		this.setState({loading:true});
		let res = await get_promo({user_id:this.props.user.id,retailer_list:this.props.retailer_list});
		if(res) {
			this.props.set_promo_list(res.items);
			this.props.set_my_promo_list(res.my_items);
		}
		this.setState({loading:false});
	}

	render() {
		let {props,state} = this;

		return (
			<Layout {...props} loading={state.loading} reload={this.reload} />
		);
	}
});
