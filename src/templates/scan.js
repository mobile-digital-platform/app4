import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View,Image} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

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
	photo_delete: {
		backgroundColor: 'red',
		borderRadius: 50,
		height: 50, width: 50,
		justifyContent: 'center', alignItems: 'center',
		position: 'absolute',
		left: 0, top: 0,
	},
});

export default class Check extends Component {
	constructor(props) {
		super(props);

	}

	camera_open = () => {
		this.props.change_camera(true);
	}
	photo_delete = () => null;

	render() {
		console.log('camera this', this);

		return (
			<View>
				{this.props.selected ? (
					<View style={[styles.selected]}>
						<Image
							style={styles.photo}
							source={{uri: 'https://cs7.pikabu.ru/post_img/big/2017/12/30/12/1514665429137170972.jpg'}}
						/>
						<TouchableOpacity style={styles.photo_delete} onPress={this.photo_delete}>
							<Icon name="close" style={{color: 'white'}} size={36} />
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity style={[styles.not_selected]} onPress={this.camera_open}>
						<Icon name="camera" style={{color: 'white'}} size={85} />
					</TouchableOpacity>
				)}
			</View>
		);
	}
}
