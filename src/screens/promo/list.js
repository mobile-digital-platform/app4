import React,{Component} from 'react';
import {Platform,StatusBar,StyleSheet,Image,Text,TouchableOpacity,View} from 'react-native';

import {light,dark}		from '../../navigation';

import Settings_Button	from '../../containers/settings_button';
import Tabs				from '../../containers/main_tabs';

import PromoList		from '../../containers/promo/list';
import MyPromoList		from '../../containers/promo/my';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
		backgroundColor: '#fff',
	},
});

export default class MainList extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Акции'.toUpperCase(),
		headerRight: (<Settings_Button navigation={navigation} />),
		...dark,
	});

	state = {
		my: false,
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<Tabs my={this.state.my} send={my => this.setState({my})} />
				<PromoList my={this.state.my} />
			</View>
		);
	}
}
