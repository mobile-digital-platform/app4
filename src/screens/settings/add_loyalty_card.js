import React,{Component} from 'react';
import {Platform,StatusBar,StyleSheet,View} from 'react-native';

import {light,dark}		from '../../navigation';

import LoyaltyCards	from '../../containers/settings/loyalty_cards';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default class MainList extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Добавить карту'.toUpperCase(),
		...light,
	});

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<LoyaltyCards/>
			</View>
		);
	}
}
