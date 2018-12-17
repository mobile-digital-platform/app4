import React,{Component} from 'react';
import {Platform,StatusBar,StyleSheet,ScrollView,View} from 'react-native';

import {light,dark}		from '../../navigation';

import ConfirmPhone		from '../../containers/settings/confirm_phone';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
let theme = JSON.parse(JSON.stringify(light));
theme.headerTitleStyle.fontSize = 17;

export default class MainList extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Подтвердить номер',
		...theme,
	});

	render() {
		return (
			<ScrollView style={styles.container}>
				<StatusBar barStyle="light-content" />
				<ConfirmPhone/>
			</ScrollView>
		);
	}
}
