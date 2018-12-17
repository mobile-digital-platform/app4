import React from 'react';
import {StyleSheet,Image,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		margin: 10,
		// backgroundColor: '#eee',
	},
	image: {
		height: 150, width: '100%',
		backgroundColor: '#eee',
	},
	area: {
		width: '100%',
		borderWidth: 1, borderTopWidth: 0, borderColor: '#ccc',
	},
	title: {
		margin: 20,
		fontSize: 20,
	},
});

export default withNavigation(({navigation,data,my,...props}) => (
	<TouchableOpacity style={styles.container} onPress={_ => navigation.push(my ? 'promo_my_view' : 'promo_view',{data})}>
		<Image style={styles.image} source={{uri:'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg'}} />
		<View style={styles.area}><Text style={styles.title}>{data.title.toUpperCase()}</Text></View>
	</TouchableOpacity>
));
