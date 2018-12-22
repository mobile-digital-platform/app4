import React,{Component} from 'react';
import {Platform,StatusBar,StyleSheet,View} from 'react-native';

import {light,dark}		from '../../navigation';

import Settings_Button	from '../../containers/settings_button';
import ChangeCity		from '../../containers/settings/change_city';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default class MainList extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Выберите город'.toUpperCase(),
		...light,
	});

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<ChangeCity/>
			</View>
		);
	}
}
