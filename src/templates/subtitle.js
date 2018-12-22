import React from 'react';
import {StyleSheet,Text,View} from 'react-native';

const styles = StyleSheet.create({
	container: {
	},
	title: {
		color: '#bbb',
		fontSize: 14, fontWeight: 'bold',
	},
});

export default (props) => (
	<Text style={[styles.title,props.style]}>{props.text.toUpperCase()}</Text>
);
