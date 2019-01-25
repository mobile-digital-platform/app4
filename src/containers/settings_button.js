import React from 'react';
import {TouchableOpacity,Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from 'react-native-vector-icons/Ionicons';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'center',
		height: '100%',
		padding: 15, paddingRight: 0,
	},
	icon: {
		marginTop: -3, marginRight: 15,
		color: '#000',
	},
});

export default ({navigation,style = {}}) => (
	<TouchableOpacity style={styles.container} onPress={_=>navigation.push('settings')}>
		<Icon name="ios-settings" style={[styles.icon,{...style}]} size={21} />
	</TouchableOpacity>
);
