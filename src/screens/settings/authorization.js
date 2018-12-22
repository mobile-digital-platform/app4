import React,{Component} from 'react';
import {Platform,StatusBar,StyleSheet,View} from 'react-native';

import {light,dark}		from '../../navigation';

import Authorization	from '../../containers/settings/authorization';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

export default class MainList extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Авторизация'.toUpperCase(),
		...light,
	});

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Authorization/>
			</View>
		);
	}
}
