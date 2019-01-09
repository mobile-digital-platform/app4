import React from 'react';
import {StyleSheet,Text,View} from 'react-native';

const styles = StyleSheet.create({
	title: {
		color: '#3D3D3D',
		fontSize: 18, fontFamily: 'GothamPro',
		lineHeight: 22,
		textAlign: 'center',
	},
});

export default (props) => (
	<Text style={[styles.title,props.style]}>{props.text}</Text>
);
