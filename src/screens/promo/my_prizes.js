import React,{Component}	from 'react';
import {StatusBar,StyleSheet,View}	from 'react-native';

import {light,dark}			from '../../navigation';

import Settings_Button		from '../../containers/settings_button';
import Tabs					from '../../containers/main_tabs';

import PromoMyPrizes		from '../../containers/promo/my_prizes';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default class PromoView extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Мои призы'.toUpperCase(),
		headerRight: (<Settings_Button navigation={navigation} type='light' />),
		...light,
	});

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<PromoMyPrizes/>
			</View>
		);
	}
}
