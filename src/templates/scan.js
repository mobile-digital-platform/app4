import React,{Component} from 'react';
import {Image,TouchableOpacity,Text,TextInput,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Cross	from '../../assets/ui/cross_red.png';
import Camera	from '../../assets/ui/camera.png';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'center', alignItems: 'center',
		marginHorizontal: 5,
	},
	photo: {
		height: 90, width: 90,
		borderRadius: 20,
	},
	remove: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute', left: 0, top: 0,
	},
	cross: {
		height: 36, width: 36,
	}
});

export default withNavigation(props => (
	<View style={styles.container}>
		<Image style={styles.photo} source={{uri:'data:image/jpg;base64,'+props.photo.base64}} />
		<TouchableOpacity style={styles.remove} onPress={_=>props.remove(props.photo.id)}>
			<Image style={styles.cross} source={Cross} />
		</TouchableOpacity>
	</View>
));
