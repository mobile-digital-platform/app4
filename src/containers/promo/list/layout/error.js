import React from 'react';
import {StyleSheet,Text,View} from 'react-native';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		margin: 10,
		// backgroundColor: '#eee',
	},
	text: {
		color: '#999',
		fontSize: 16,
	},
});

export default (props) => (
	<View style={styles.container}><Text style={styles.text}>{props.error.message}</Text></View>
);
