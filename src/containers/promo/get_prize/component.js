import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request} from '../../../redux/reducers/promo';

import alert from '../../../services/alert';

import Layout from './layout';

export default withNavigation(class PromoGetPrizeComponent extends Component {
	state = {

	};

	send_data = (data) => {

	}

	render() {

		// console.log("Get Prize Component",this.props);
		return (
			<Layout
				{...this.props}
				send_data={this.send_data}
			 />
		);
	}
});
