import React,{Component} from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import Layout from './layout';

export default withNavigation(class PromoViewComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.navigation.getParam('data',null),
		};
	}

	componentDidMount() {
	}

	render() {
		console.log("Component Promo View",this.state);

		return (
			<Layout
				{...this.props}
				data={this.state.data}
			/>
		);
	}
});
