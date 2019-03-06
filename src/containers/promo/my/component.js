import React,{Component} from 'react';
import {withNavigation,NavigationEvents} from 'react-navigation';

import {request}	from '../../../redux/reducers/promo';

import Layout from './layout';

export default withNavigation(class MyPromoListComponent extends Component {
	constructor(props) {
		super(props);

		this.id = props.navigation.getParam('id',0);

		this.state = {
			data: this.get_promo(this.id),
			details: {},
			details_error: '',
			check: [],
			check_error: '',
			loading: false,
		};
	}

	componentDidMount() {
		this.get_data();
		// this.props.navigation.push('promo_my_prizes',{id:this.id});
	}

	get_promo = (id) => this.props.promo.find(e => e.id==id);

	get_data = async () => {
		this.setState({loading:true});
		// Если загружаем в первый раз, то не показываем значок загрузки, если она длится менее секунды
		// if(!this.state.check.length) setTimeout(_=>this.setState(state => ({loading:!state.check.length})),1000);

		let waiting = [];

		// Загружаем список чеков
		waiting.push(new Promise(async (resolve) => {
			let {response,error} = await request.get_checks({
				user_id: this.props.user.id,
				promo_id: this.state.data.id,
			});
			if(response)	this.setState({check:response.items});
			if(error)		this.setState({check_error:error.message});
			resolve();
		}));

		// Загружаем информацию по возможностям в акции
		waiting.push(new Promise(async (resolve) => {
			let {response,error} = await request.get_details({
				user_id: this.props.user.id,
				promo_id: this.state.data.id,
			});
			if(response)	this.setState({details:response});
			if(error)		this.setState({details_error:error.message});
			resolve();
		}));

		// Ждем 2 секунды, чтоб слишком быстро не моргал кружок загрузки
		if(this.state.check.length) waiting.push(new Promise(res => setTimeout(res,1000)));

		await Promise.all(waiting);
		await this.setState({loading:false});
	}

	render() {
		// console.log("Component My Promo List",this.state);

		return (<Layout {...this.state} get_data={this.get_data} />);
	}
});
