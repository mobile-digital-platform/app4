import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View,Image} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {withNavigation} from 'react-navigation';

const styles = StyleSheet.create({
	container: {
	},
	selected: {
		marginVertical: 10, marginHorizontal: 10,
		height: 100, width: 100,
		borderRadius: 30,
		justifyContent: 'center', alignItems: 'center',
	},
	not_selected: {
		marginVertical: 10, marginHorizontal: 10,
		height: 100, width: 100,
		backgroundColor: 'red',
		borderRadius: 30,
		justifyContent: 'center', alignItems: 'center',
	},
	photo: {
		height: 100, width: 100,
		borderRadius: 30,
	},
	remove: {
		backgroundColor: 'red',
		borderRadius: 50,
		height: 50, width: 50,
		justifyContent: 'center', alignItems: 'center',
		position: 'absolute',
		left: 0, top: 0,
	},
});

export default withNavigation((props) => (
	<View>
		{props.selected ? (
			<View style={styles.selected}>
				<Image
					style={styles.photo}
					source={{uri: props.photo.path}}
					//source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
				/> 
				<TouchableOpacity style={styles.remove} onPress={_ => props.remove(props.photo)}>
					<Icon name="close" style={{ color: 'white' }} size={36} />
				</TouchableOpacity>
			</View>
		) : (
				<TouchableOpacity style={styles.not_selected} onPress={_ => props.changeCamera(true)}>
					<Icon name="camera" style={{ color: 'white' }} size={85} />
				</TouchableOpacity>
		)}
	</View>
));