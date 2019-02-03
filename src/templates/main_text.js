import React from 'react';
import {Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	title: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
		textAlign: 'center',
	},
});

export default (props) => (
	<Text style={[styles.title,props.style]}>{props.text}</Text>
);
