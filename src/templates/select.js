import React from 'react';
import {Keyboard,StyleSheet,TouchableOpacity,Text,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 65,
		marginVertical: 5, paddingLeft: 25, paddingRight: 5,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		backgroundColor: '#fff',
	},
	container_error: {
		borderColor: '#f40000',
	},
	left: {
		flex: 1,
	},
	title: {
		marginTop: 10, paddingTop: 3,
		// backgroundColor: '#eee',
		color: '#bbb',
		fontSize: 14, fontFamily: 'GothamPro',
	},
	title_active: {
		marginTop: 0, paddingTop: 3,
		fontSize: 18, fontFamily: 'GothamPro',
	},
	input: {
		width: '100%',
		marginBottom: 8,
		paddingTop: 6, paddingBottom: 3,
		fontSize: 18, fontFamily: 'GothamPro',
	},
	right: {
		width: 20,
		textAlign: 'right',
	},
	error_text: {
		marginLeft: 20, marginBottom: 10, paddingTop: 3,
		fontSize: 14, fontFamily: 'GothamPro',
		color: '#f40000',
	},
});

export default withNavigation(({navigation,...props}) => (
	<View>
		<TouchableOpacity style={[styles.container,props.error?styles.container_error:{}]} onPress={_ => {
			Keyboard.dismiss();
			navigation.push('settings_change_city');
		}}>
			<View style={styles.left}>
			{props.value ? (
				<View>
					<Text style={styles.title}>Город</Text>
					<Text style={styles.input} numberOfLines={1}>{props.name}</Text>
				</View>
			) : (
				<Text style={[styles.title,styles.title_active]}>Город</Text>
			)}
			</View>
			<Text styles={styles.right}><Icon name="chevron-down" style={{color:'red'}} size={40}/></Text>
		</TouchableOpacity>
		{props.error ? (<Text style={styles.error_text}>{props.error}</Text>) : null}
	</View>
));
