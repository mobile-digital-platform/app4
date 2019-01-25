import React,{Component} from 'react';
import {StatusBar,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Splash from '../containers/splash';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '$red',
	},
});

export default class SplashScreen extends Component {
	static navigationOptions = {
		headerStyle: {
			display: 'none',
		},
	};

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Splash set_page={this.props.set_page} />
			</View>
		);
	}
}
