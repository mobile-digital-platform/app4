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
	text: {
		color: '#bbb',
		marginTop: 15, marginBottom: 15,
		fontSize: 14, fontFamily: 'GothamPro', lineHeight: 18,
		textAlignVertical: 'top', justifyContent: 'flex-start',
	},
	error_text: {
		marginLeft: 20, marginBottom: 10,
		fontSize: 14, fontFamily: 'GothamPro',
		color: '$red',
	},
});

export default withNavigation(({navigation,...props}) => (
	<View>
		<TouchableOpacity style={[styles.container,props.error?styles.container_error:{}]} onPress={_=>{
			Keyboard.dismiss();
			navigation.push('promo_change_adress');
		}}>
			{props.value ? (
				<Text style={styles.text} numberOfLines={1}>{props.value}</Text>
			) : (
				<Text style={[styles.text,styles.title_active]}>Выберите адрес доставки</Text>
			)}
		</TouchableOpacity>
		{props.error?.length ? (<Text style={styles.error_text}>{props.error}</Text>) : null}
	</View>
));
