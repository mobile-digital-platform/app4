import React,{Component} from 'react';
import {ActivityIndicator,Image,TouchableOpacity,Text,TextInput,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Cross	from '../../assets/ui/cross_red.png';
import Camera	from '../../assets/ui/camera.png';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'center', alignItems: 'center',
		height: 90, width: 90,
		marginHorizontal: 5,
		borderRadius: 20,
		backgroundColor: '#eee',
	},
	photo: {
		height: 90, width: 90,
		borderRadius: 20,
	},
	remove: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute', right: 0, top: 0,
	},
	cross: {
		height: 36, width: 36,
	}
});

export default (props) => {
	// console.log(props.photo);
	return (
	<View style={styles.container}>
		{props.photo.state == 'ready' ? (
			props.photo.uri ? (
				<Image style={styles.photo} source={{uri:props.photo.uri}} />
			) : props.photo.base64 ? (
				<Image style={styles.photo} source={{uri:'data:image/png;base64,'+props.photo.base64}} />
			) : null
		) : (
			<ActivityIndicator/>
		)}
		<TouchableOpacity style={styles.remove} onPress={_=>props.remove(props.photo.id)}>
			<Image style={styles.cross} source={Cross} />
		</TouchableOpacity>
	</View>
)
}
