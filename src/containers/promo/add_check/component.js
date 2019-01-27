import React,{Component} from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import Layout from './layout';

export default withNavigation(class PromoAddCheckComponent extends Component {
	constructor(props) {
		super(props);
		console.log('Component this', this);
		this.scroll = React.createRef();
	}

	set_data = async (data) => {
		this.props.update_check(data);
	}
	save_data = async (data) => {
		// await ...
	}

	render() {
		console.log("Component this",this);

		return (
			<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
				<Layout 
					{...this.props}
					scroll={this.scroll}
					set_data={this.set_data}
					save_data={this.save_data}
				/>
			</ScrollView>
		);
	}
});