import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request} from '../../../redux/reducers/promo';

import alert from '../../../services/alert';

import Layout from './layout';

export default withNavigation(class PromoMyPrizesComponent extends Component {
	state = {
		list: [],
		loading: false,
	};

	async componentDidMount() {
		this.id = this.props.navigation.getParam('id',0);
		await this.load_data();
	}

	load_data = async () => {
		this.setState({loading:true});
		let {response,error} = await request.get_user_prizes({user_id:this.props.user.id,promo_id:this.id});
		if(response) {
			console.log(response);
			this.setState({list:response.items});
		}
		if(error) {
			alert("Не удалось загрузить данные",error.message);
		}
		this.setState({loading:false});
	}

	render() {
		console.log(this.state);
		return (
			<Layout
				promo_id={this.id}
				{...this.props}
				{...this.state}
				reload={this.load_data}
			/>
		);
	}
});
