import React from 'react';
import {StyleSheet,Text,View} from 'react-native';

const styles = StyleSheet.create({
	title: {
		paddingTop: 3,
		color: '#bbb',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
});

export default (props) => (
	<Text style={[styles.title,props.style]}>{props.text.toUpperCase()}</Text>
);
