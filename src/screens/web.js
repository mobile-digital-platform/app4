import React,{Component} from 'react';
import {ActivityIndicator,ScrollView,StatusBar,View,Text,WebView} from 'react-native';

import {light,dark} from '../navigation';

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
						renderLoading={_=><ActivityIndicator size='large' />}
						startInLoadingState={true}
					/>
				) : null}
			</View>
		);
	}
}
