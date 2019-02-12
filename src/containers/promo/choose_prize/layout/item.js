import React from 'react';
import {Image,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		margin: 10, padding: 10,
		backgroundColor: '#f4f4f4',
	},
	image: {
		height: 50, width: 50,
		borderRadius: 25,
		backgroundColor: '#fff',
	},
	area: {
		flex: 1,
		marginLeft: 10,
	},
	title: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro-Bold',
		lineHeight: 18,
	},
	info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
	},
	cost: {
		color: '#3d3d3d',
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
	cost_number: {
		fontFamily: 'GothamPro-Bold',
	},
	remains: {
		color: '#3d3d3d',
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 14,
	},
	remains_number: {
		color: '$red',
		fontFamily: 'GothamPro-Bold',
	},
	button: {
		justifyContent: 'center',
		height: 30, width: 110,
		borderRadius: 40,
		backgroundColor: '$red',
	},
	button_text: {
		color: '#fff',
		fontSize: 12, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
		lineHeight: 16,
	},
	details: {
		marginTop: 10,
		color: '#b3b3b3',
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 14,
	},
});

export default withNavigation((props) => (
	<View style={styles.container}>
		<Image style={styles.image} source={{uri:props.image_url}} />
		<View style={styles.area}>
			<Text style={styles.title}>{props.name}</Text>
			<View style={styles.info}>
				<Text style={styles.cost}><Text style={styles.cost_number}>{props.cost}</Text> {props.cost_type}</Text>
				<Text style={styles.remains}>Осталось: <Text style={styles.remains_number}>{props.remains} шт.</Text></Text>
			</View>
			{props.remains>0 && props.available_points>props.cost ? (
				<TouchableOpacity style={styles.button} onPress={props.select}>
					<Text style={styles.button_text}>Выбрать</Text>
				</TouchableOpacity>
			) : (
				<Text style={styles.details}>{props.details}</Text>
			)}
		</View>
	</View>
));
