import React,{Component} from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import Layout from './layout';

export default withNavigation(class PromoViewComponent extends Component {
	state = {};

	componentDidMount() {
		let data = this.props.navigation.getParam('data');
		this.props.set_data(data);
		this.props.get_retailers(this.props.id);
	}

	render() {
		console.log("Component",this.props.data);

		return (
			<Layout
				{...this.props}
				state={this.state}
			/>
		);
	}
});
