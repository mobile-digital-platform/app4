import React,{Component} from 'react';
import {Platform,StatusBar,StyleSheet,View} from 'react-native';

import {light,dark}	from '../../navigation';

import Main			from '../../containers/settings';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default class MainSettings extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Настройки'.toUpperCase(),
		...light,
	});

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Main/>
			</View>
		);
	}
}
