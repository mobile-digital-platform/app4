import React,{Component} from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import Layout from './layout';

export default withNavigation(class PromoViewComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.get_data(this.props.navigation.getParam('id',0)),
		};
	}

	componentDidUpdate(prev_props) {
		if(!Object.is(prev_props,this.props)) {
			this.setState({data:this.get_data(this.props.navigation.getParam('id',0))});
		}
	}

	get_data = (id) => this.props.promo.find(e => e.id==id);

	render() {
		// console.log("Component Promo View",this.state.data);

		return (
			<Layout
				{...this.props}
				data={this.state.data}
			/>
		);
	}
});
