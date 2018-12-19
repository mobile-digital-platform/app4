import React,{Component} from 'react';
import {Platform,StyleSheet,StatusBar,ScrollView,View,Text,WebView} from 'react-native';

import {light,dark}		from '../navigation';

import Wait from '../templates/wait';

export default class Web extends Component {
	static navigationOptions = ({navigation}) => ({
		title: navigation.getParam('title'),
		...dark,
	});

	render() {
		let src = this.props.navigation.getParam('source');
		return (
			<View style={{flex:1}}>
				<StatusBar barStyle="dark-content" />
				{src ? (
					<WebView
						source={{uri:src}}
						renderLoading={_=><Wait/>}
						startInLoadingState={true}
					/>
				) : null}
			</View>
		);
	}
}
