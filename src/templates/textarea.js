import React from 'react';
import {StyleSheet,TextInput,Text,View} from 'react-native';

const styles = StyleSheet.create({
	container: {
		marginVertical: 5, paddingHorizontal: 25,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 20,
		backgroundColor: '#fff',
	},
	input: {
		color: '#bbb',
		height: 110, width: '100%',
		marginTop: 15, marginBottom: 15,
		fontSize: 18, fontFamily: 'GothamPro', lineHeight: 18,
		textAlignVertical: 'top', justifyContent: 'flex-start',
	},
});

export default (props) => (
	<View style={styles.container}>
		<TextInput style={[styles.input, props.style]} multiline={true} value={props.value} placeholder={props.title ? props.title : "Укажите адрес постоянной регистрации (как в паспорте)"} />
	</View>
);
