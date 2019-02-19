import React,{Component} from 'react';
import {StatusBar,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {light,dark}	from '../navigation';

import Help			from '../containers/help';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
	},
});

export default class SplashScreen extends Component {
	static navigationOptions = {
		title: 'Задать вопрос'.toUpperCase(),
		...light,
	};

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Help/>
			</View>
		);
	}
}
