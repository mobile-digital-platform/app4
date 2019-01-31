import React from 'react';
import {Platform,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	title: {
		marginBottom: 9,
		paddingTop: Platform.select({ios:3,android:0}),
		color: '#b3b3b3',
		fontSize: 10, fontFamily: 'GothamPro-Bold',
	},
});

export default (props) => {
	const props_styles = EStyleSheet.create({
		title: props.style,
	});

	return (
		<Text style={[styles.title,props_styles.title]}>{props.text.toUpperCase()}</Text>
	);
}
