import React from 'react';
import {Keyboard,Platform,Image,TouchableOpacity,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Arrow from '../../assets/ui/right_arrow.png';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		marginVertical: 5, paddingLeft: 20, paddingRight: 5,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		backgroundColor: '#fff',
	},
	container_error: {
		borderColor: '$red',
	},
	left: {
		flex: 1,
	},
	title: {
		marginTop: 10,
		color: '#bbb',
		fontSize: 10, fontFamily: 'GothamPro',
		lineHeight: 12,
	},
	title_active: {
		marginTop: 0,
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
	},
	input: {
		width: '100%',
		paddingBottom: 7,
		fontSize: 14, fontFamily: 'GothamPro-Medium',
		lineHeight: 18,
	},
	right: {
	},
	right_arrow: {
		height: 20, width: 20,
		marginHorizontal: 10,
	},
	error_text: {
		marginLeft: 20, marginBottom: 10,
		fontSize: 14, fontFamily: 'GothamPro',
		color: '$red',
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
			<View styles={styles.right}><Image style={styles.right_arrow} source={Arrow} /></View>
		</TouchableOpacity>
		{props.error ? (<Text style={styles.error_text}>{props.error}</Text>) : null}
	</View>
));
