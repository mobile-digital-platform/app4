import React,{Component}	from 'react';
import {StatusBar,StyleSheet,View}	from 'react-native';

import {light,dark}			from '../../navigation';

import Settings_Button		from '../../containers/settings_button';
import Tabs					from '../../containers/main_tabs';

import Promo_AddCheck		from '../../containers/promo/add_check';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default class PromoView extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Кассовый чек',
		headerRight: (<Settings_Button navigation={navigation} style={{color:'#fff'}} />),
		...light,
	});

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Promo_AddCheck/>
			</View>
		);
	}
}