import React from 'react';
import {StyleSheet,TouchableOpacity,Text} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';

export default ({navigation,style = {}}) => (
	<TouchableOpacity style={{height:70,padding:15,paddingRight:0}} onPress={_=>navigation.push('settings')}>
		<Icon name="gear" style={{marginRight:10,color:'#000',...style}} size={40} />
	</TouchableOpacity>
);
