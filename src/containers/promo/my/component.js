import React,{Component} from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import {request}	from '../../../redux/reducers/promo';

import Layout from './layout';

export default withNavigation(class MyPromoListComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.get_data(props.navigation.getParam('id',0)),
			details: {},
			check: [],
			check_error: '',
			waiting: false,
		};
	}

	async componentDidMount() {
		this.setState({waiting:true});
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

	get_data = (id) => this.props.promo.find(e => e.id==id);

	render() {
		// console.log("Component My Promo List",this.state);

		return (
			<Layout
				{...this.state}
			/>
		);
	}
});
