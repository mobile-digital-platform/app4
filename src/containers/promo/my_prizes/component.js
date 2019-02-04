import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request} from '../../../redux/reducers/promo';

import Layout from './layout';

export default withNavigation(class PromoMyPrizesComponent extends Component {
	state = {
		prize_list: [],
	};

	async componentDidMount() {
		this.id = this.props.navigation.getParam('id',0);

		let {response,error} = await request.get_user_prizes({user_id:this.props.user.id,promo_id:this.id});
		if(response) {
			console.log(response);
		}
		if(error) {
		}
	}

	render() {
		return (
			<Layout
				{...this.props}
				prize_list={this.state.prize_list}
			/>
		);
	}
});
