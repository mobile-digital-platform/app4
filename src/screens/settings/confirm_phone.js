import React,{Component} from 'react';
import {Platform,StatusBar,StyleSheet,View} from 'react-native';

import {light,dark}		from '../../navigation';

import ConfirmPhone		from '../../containers/settings/confirm_phone';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
let theme = JSON.parse(JSON.stringify(light));
theme.headerTitleStyle.fontSize = 16;

export default class MainList extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Подтвердить номер'.toUpperCase(),
		...theme,
	});

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<ConfirmPhone/>
			</View>
		);
	}
}
