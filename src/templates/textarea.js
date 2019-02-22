import React from 'react';
import {Platform,TextInput,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
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
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
	error_text: {
		marginLeft: 25, marginBottom: 10, paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 14, fontFamily: 'GothamPro',
		color: '$red',
	},
});

export default (props) => (
	<>
		<View style={[styles.container,props.style]}>
			<TextInput
				style={[styles.input,props.area_style]}
				multiline={true}
				value={props.value}
				editable={!props.disabled}
				placeholder={props.placeholder}
				onFocus={_ => {if(props.keyboard_options) props.keyboard_options.scroll.current.scrollTo({y:props.keyboard_options.offset})}}
				onChangeText={text => props.update(text)}
			/>
		</View>
		{props.error?.length ? (<Text style={styles.error_text}>{props.error}</Text>) : null}
	</>
);
