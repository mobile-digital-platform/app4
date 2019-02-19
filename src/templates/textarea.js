import React from 'react';
import {StyleSheet,TextInput,Text,View} from 'react-native';

const styles = StyleSheet.create({
	container: {
		marginVertical: 5, paddingHorizontal: 20,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 25,
		backgroundColor: '#fff',
	},
	input: {
		flex: 1,
		width: '100%',
		marginVertical: 12.5,
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
});

export default (props) => (
	<View style={[styles.container,props.style]}>
		<TextInput
			style={[styles.input,props.area_style]}
			multiline={true}
			value={props.value}
			disabled={props.disabled}
			placeholder={props.placeholder}
			onFocus={_ => {if(props.keyboard_options) props.keyboard_options.scroll.current.scrollTo({y:props.keyboard_options.offset})}}
			onChangeText={text => props.update(text)}
		/>
	</View>
);
