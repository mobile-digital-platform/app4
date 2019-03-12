import React			from 'react';
import {StatusBar,View}	from 'react-native';
import EStyleSheet		from 'react-native-extended-stylesheet';
import firebase			from 'react-native-firebase';

import Splash			from '../containers/splash';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '$red',
	},
});

const page_title = 'Загрузка';

export default class SplashScreen extends React.Component {
	static navigationOptions = {
		headerStyle: {
			display: 'none',
		},
	};

	componentDidMount() {
		firebase.analytics().setCurrentScreen(page_title);
		// firebase.analytics().logEvent("XSS",{xss:1});
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Splash set_page={this.props.set_page} />
			</View>
		);
	}
}
