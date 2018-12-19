import React,{Component} from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import Layout from './layout';

export default withNavigation(class PromoParticipaateComponent extends Component {
	state = {};

	componentDidMount() {
		this.id = this.props.navigation.getParam('id');
		// this.props.get_data(this.id);
	}

	render() {
		console.log("Component",this.props);

		return (
			<Layout
				{...this.props}
				state={this.state}
			/>
		);
	}
});
