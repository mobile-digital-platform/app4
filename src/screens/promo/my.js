import React,{Component} from 'react';
import {Platform,StatusBar,StyleSheet,Image,Text,TouchableOpacity,View} from 'react-native';

import {light,dark}		from '../../navigation';

import Settings_Button	from '../../containers/settings_button';

import Promo_View		from '../../containers/promo/my';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default class PromoView extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Моя акция'.toUpperCase(),
		headerRight: (<Settings_Button navigation={navigation} type='light' />),
		...light,
	});

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Promo_View/>
			</View>
		);
	}
}
