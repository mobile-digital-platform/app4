import React from 'react';
import {Keyboard,Platform,Image,TouchableOpacity,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

const styles = EStyleSheet.create({
	container: {
		marginVertical: 5,
		paddingHorizontal: 25, paddingHorizontal: 20,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 20,
		height: 110, width: '100%',
		backgroundColor: '#fff',
		flex: 1,
	},
	container_error: {
		borderColor: '$red',
	},
	title: {
		color: '#bbb',
		marginTop: 15, marginBottom: 15,
		fontSize: 14, fontFamily: 'GothamPro', lineHeight: 18,
	},
	text: {
		color: '#3d3d3d',
		marginTop: 15, marginBottom: 15,
		fontSize: 14, fontFamily: 'GothamPro', lineHeight: 18,
	},
	disabled: {
		color: '#b3b3b3',
	},
	error_text: {
		marginLeft: 20, marginBottom: 10,
		fontSize: 14, fontFamily: 'GothamPro',
		color: '$red',
	},
});

export default withNavigation(({navigation,...props}) => (
	props.value && props.disabled ? (
		<View style={styles.container}>
			<Text style={[styles.text,styles.disabled]}>{props.value}</Text>
		</View>
	) : (
		<>
			<TouchableOpacity style={[styles.container,props.error?styles.container_error:{}]} onPress={_=>navigation.push('settings_change_address')}>
				{props.value ? (
					<Text style={styles.text}>{props.value}</Text>
				) : (
					<Text style={styles.title}>{props.title}</Text>
				)}
			</TouchableOpacity>
			{props.error?.length ? (<Text style={styles.error_text}>{props.error}</Text>) : null}
		</>
	)
));
