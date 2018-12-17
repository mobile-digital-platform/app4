import React,{Component} from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import Layout from './layout';

export default withNavigation(class MyPromoListComponent extends Component {
	state = {};

	componentDidMount() {
	}

	render() {
		console.log("Component My Promo List",this.props);

		return (
			<Layout
				{...this.props}
				state={this.state}
			/>
		);
	}
});
