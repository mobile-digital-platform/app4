import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import { withNavigation } from 'react-navigation';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
	modal: {
		flex: 1,
	},
	camera: {
		flex: 1,
		height: '100%'
	},
	capture: {
		position: 'absolute',
		bottom: 20,
		alignSelf: 'center',
		paddingHorizontal: 25, paddingVertical: 15,
		borderRadius: 100,
		backgroundColor: 'red',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	capture_text: {
		color: '#fff',
		fontSize: 20,
	},
	close: {
		position: 'absolute',
		top: '3%', right: '3%',
		zIndex: 10
	}
});

export default withNavigation(class Camera extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: props.visible,
		};
		console.log('конструктор камеры');
	}
	
	takePicture = (data) => {
		console.log(data);
	};
	closeCamera = () => {
		console.log('close_camera', this);
		this.props.change_camera(false);
	}
	render() {
    console.log('camera this', this);
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.props.visible}
				onRequestClose={this.closeCamera}>
				<View style={styles.modal}>
					<TouchableOpacity style={styles.close} onPress={this.closeCamera}>
						<Icon name="close" style={{ color: 'white' }} size={40} />
					</TouchableOpacity>
					<RNCamera
						flashMode={RNCamera.Constants.FlashMode.on}
						ref={(cam) => {
							this.camera = cam;
						}}
						style={styles.camera}>
					</RNCamera>
					<TouchableOpacity style={styles.capture} onPress={this.takePicture}>
						<Text style={styles.capture_text}>Сделать снимок</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}
});
