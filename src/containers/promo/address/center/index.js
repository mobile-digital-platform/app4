import React,{Component} from 'react';
import {FlatList} from 'react-native';
import {withNavigation} from 'react-navigation';

import {request as promo_request}		from '../../../../redux/reducers/promo';
import {request as settings_request}	from '../../../../redux/reducers/settings';

import alert	from '../../../../services/alert';
import st		from '../../../../services/storage';

import Layout	from './layout';

export default withNavigation(class PromoGetPrizeComponent extends Component {
	state = {
		list: [],
		loading: false,
	};

	componentDidMount() {
		this.get_prize_center_list();
	}

	get_prize_center_list = async () => {
		this.setState({loading:true});
		let {response,error} = await promo_request.get_prize_center_list({
			user_id: this.props.user.id,
			promo_id: this.props.promo_id,
		});
		if(response) {
			this.setState({list:response.items});
		}
		if(error) {
			await alert("Не удалось загрузить список центров выдачи призов","Зайдите на эту страницу позже");
		}
		this.setState({loading:false});
	}

	send_data = (data) => {
		this.props.update_user(data);
		this.next();
	}
	next = () => {
		this.props.navigation.push('promo_passport',{
			promo_id:		this.props.promo_id,
			get_type:		this.props.get_type,
			user_data_type:	this.props.user_data_type,
		});
	}

	render() {
		// console.log("Get Prize Center Component",this.props);

		return (
			<Layout
				loading={this.state.loading}
				list={this.state.list}
				send_data={this.send_data}
			/>
		);
	}
});
