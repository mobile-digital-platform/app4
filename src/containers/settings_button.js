import React from 'react';
import {StyleSheet,TouchableOpacity,Text} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default ({navigation,style = {}}) => (
	<TouchableOpacity style={{justifyContent:'center',height:70,padding:15,paddingRight:0}} onPress={_=>navigation.push('settings')}>
		<Icon name="ios-settings" style={{marginRight:15,color:'#000',...style}} size={30} />
	</TouchableOpacity>
);
