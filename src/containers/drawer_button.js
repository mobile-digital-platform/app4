import React from 'react';
import {TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from 'react-native-vector-icons/EvilIcons';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'center',
		height: '100%',
		padding: 10,
		// backgroundColor: '#eee',
	},
	icon: {
		height: 20, width: 20,
	},
});

export default ({navigation,type = 'dark'}) => (
	<TouchableOpacity style={styles.container} onPress={navigation.openDrawer}>
		<Icon name="navicon" style={{dark:{color:'#3d3d3d'},light:{color:'#fff'}}[type]} size={30} />
	</TouchableOpacity>
);
