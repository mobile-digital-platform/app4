import React from 'react';
import {Linking,Image,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginTop: 20, padding: 10,
		backgroundColor: '#f4f4f4',
	},
	image_area: {
		height: 50, width: 50,
		borderRadius: 25,
		backgroundColor: '#fff',
	},
	image: {
		height: 50, width: 50,
		borderRadius: 25,
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
	checks: {
		marginTop: 5,
		color: '#3d3d3d',
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
	state: {
		marginVertical: 10,
		color: '#b3b3b3',
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 14,
	},
});

export default (props) => (
	<View style={styles.container}>
		<View style={styles.image_area}>
			{props.image_url ? (<Image style={styles.image} source={{uri:props.image_url}} />) : null}
		</View>
		<View style={styles.area}>
			<Text style={styles.title}>{props.name}</Text>
			{props.details?.length ? (<Text style={styles.checks}>{props.details}</Text>) : null}
			{props.link?.length ? (
				<TouchableOpacity onPress={_=>Linking.openURL(props.link)}>
					<Text style={styles.state}>{props.state}</Text>
				</TouchableOpacity>
			) : (
				<Text style={styles.state}>{props.state}</Text>
			)}
		</View>
	</View>
);
