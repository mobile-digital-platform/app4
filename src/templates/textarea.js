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
		height: 110, width: '100%',
		marginTop: 15, marginBottom: 15,
		fontSize: 18,
	},
});

export default (props) => (
	<View style={styles.container}>
		<TextInput style={styles.input} multiline={true} value={props.value} placeholder="Укажите адрес постоянной регистрации (как в паспорте)" />
	</View>
);
