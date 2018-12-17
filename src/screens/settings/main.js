import React,{Component} from 'react';
import {Platform,StatusBar,StyleSheet,Image,ScrollView,Text,TouchableOpacity,View} from 'react-native';

import {light,dark}	from '../../navigation';

import Main			from '../../containers/settings';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#fff',
	},
});

export default class MainSettings extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Настройки',
		...light,
	});

	render() {
		return (
			<ScrollView style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Main/>
			</ScrollView>
		);
	}
}
