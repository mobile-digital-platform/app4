/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, Platform, StyleSheet, Image, Text, View} from 'react-native';
import {
	createStackNavigator,
	createAppContainer
}									from 'react-navigation';
import {Provider}					from 'react-redux';

import Icon from 'react-native-vector-icons/EvilIcons';

import Bottle	from './assets/splash_screen/bottle.png';
import Bubbles0	from './assets/splash_screen/bubbles0.png';
import Bubbles1	from './assets/splash_screen/bubbles1.png';
import Bubbles2	from './assets/splash_screen/bubbles2.png';

import store						from './src/redux';

class App extends Component {
	state = {
		res: '',
	};

	componentDidMount() {
		setTimeout(_ => AsyncStorage.getItem('coca-cola').then(res => this.setState({res:JSON.stringify(res)})),5000);
	}

	render() {
		return (
			<View style={styles.container}>
			<Text style={styles.welcome} onPress={_=>this.props.navigation.push('onboarding')}>Welcome to React Native!</Text>
			<Text style={styles.instructions}>To get started, edit App.js {'\n'+this.state.res}</Text>
			<Icon name="gear" style={{marginRight:10,color:'#000'}} size={40} />
			<Image style={[styles.image]} source={{uri:'https://www.coca-cola.ru/images/meals/logo.png'}} />
			<Image style={[styles.image]} source={Bottle} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
	  height: 100,
	  width: 100,
  },
});

const Root = createAppContainer(createStackNavigator(
	{
		a: App,
	},
	{
		initialRouteName: 'a',
	}
));

export default () => <Provider store={store}><Root/></Provider>
