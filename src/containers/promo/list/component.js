import React,{Component} from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import {request} from '../../../redux/reducers/promo';

import AllLayout from './all_layout/list';
import MyLayout  from './my_layout/list';

export default withNavigation(class PromoListComponent extends Component {
	state = {
		loading: false,
	};

	componentDidMount() {
		// this.props.navigation.push('settings');
	}

	reload = () => {
	}
	load_new = () => {
	}
	load_next = () => {
	}

	render() {
		console.log("Promo List Component",this.props);

		return (
			this.props.my ? (
				<MyLayout
					{...this.props}
					state={this.state}
					reload={this.reload}
				/>
			) : (
				<AllLayout
					{...this.props}
					state={this.state}
					reload={this.reload}
				/>
			)
		);
	}
});
