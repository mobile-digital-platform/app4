import React			from 'react';
import {StatusBar,View} from 'react-native';
import EStyleSheet		from 'react-native-extended-stylesheet';
import firebase			from 'react-native-firebase';

import {light,dark}		from '../navigation';

import Help				from '../containers/help';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
	},
});

const page_title = 'Задать вопрос';

export default class SplashScreen extends React.Component {
	static navigationOptions = {
		title: page_title.toUpperCase(),
		...light,
	};

	componentDidMount() {
		firebase.analytics().setCurrentScreen(page_title);
		// firebase.analytics().logEvent("",{});
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Help/>
			</View>
		);
	}
}
