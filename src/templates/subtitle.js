import React from 'react';
import {Platform,StyleSheet,Text,View} from 'react-native';

const styles = StyleSheet.create({
	title: {
		paddingTop: Platform.select({ios:3,android:0}),
		color: '#bbb',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
});

export default (props) => (
	<Text style={[styles.title,props.style]}>{props.text.toUpperCase()}</Text>
);
