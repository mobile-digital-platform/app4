import React,{Component} from 'react';
import {Image,TouchableOpacity,Text,TextInput,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Photo			from '../../../templates/scan';
import CameraImage		from '../../../../assets/ui/camera.png';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'space-between', alignItems: 'center',
		paddingVertical: 10,
	},
	camera_area: {
		marginHorizontal: 5,
	},
	camera: {
		height: 90, width: 90,
		borderRadius: 18,
	},
	text: {
		flex: 1,
		color: '#3D3D3D',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
		marginLeft: 20
	}
});

export default withNavigation(props => (
	<View style={styles.container}>
		{props.value ? (
			<Photo photo={props.value} remove={this.remove_photo} />
		) : (
			<TouchableOpacity style={styles.camera_area} onPress={this.open_camera}>
				<Image style={styles.camera} source={CameraImage} />
			</TouchableOpacity>
		)}
		<Text style={styles.text}>{props.text}</Text>
	</View>
));