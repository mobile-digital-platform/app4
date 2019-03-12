import React from 'react';
import {StyleSheet,Text,View} from 'react-native';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		margin: 10,
	},
	text: {
		color: '#3d3d3d',
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
});

export default (props) => (
	<View style={styles.container}><Text style={styles.text}>{props.error.message}</Text></View>
);
