import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request}	from '../../../redux/reducers/promo';

import Layout from './layout';

export default withNavigation(class MyPromoListComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.get_promo(props.navigation.getParam('id',0)),
			details: {},
			check: [],
			check_error: '',
			waiting: false,
		};
	}

	async componentDidMount() {
		this.get_data();
	}

	get_promo = (id) => this.props.promo.find(e => e.id==id);

	get_data = async () => {
		this.setState({waiting:true});
		// await new Promise(res => setTimeout(res,2000));
		await Promise.all([
			new Promise(async (resolve) => {
				let {response,error} = await request.get_checks({
					user_id: this.props.user.id,
					promo_id: this.state.data.id,
				});
				if(response) {
					this.setState({check:response.items});
				}
				if(error) {
					this.setState({check_error:error.message});
				}
				resolve();
			}),
			new Promise(async (resolve) => {
				let {response,error} = await request.get_details({
					user_id: this.props.user.id,
					promo_id: this.state.data.id,
				});
				if(response) {
					response.add_check = 1;
					response.buy_prize = 1;
					this.setState({details:response});
				}
				if(error) {
					this.setState({check_error:error.message});
				}
				resolve();
			}),
		]);
		this.setState({waiting:false});
	}

	render() {
		// console.log("Component My Promo List",this.state);

		return (<Layout {...this.state} get_data={this.get_data} />);
	}
});
