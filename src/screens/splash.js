import React,{Component} from 'react';
import {StyleSheet,StatusBar,View} from 'react-native';

import Splash from '../containers/splash';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f40000',
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
