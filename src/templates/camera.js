import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View, Image, Modal, CameraRoll, PermissionsAndroid} from 'react-native';
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
		this.state= {
			visible: this.props.visible
		};
		console.log('конструктор Camera');
	}

	componentDidUpdate(prevProps) {
		console.log('didupdate ');
		if(!Object.is(prevProps,this.props)){
			this.setState({
				visible: this.props.visible
			})
		}
	}
	closeCamera = () =>{
		//this.setState({visible: false});
		this.props.changeCamera(false);
	}
	requestPermission = async (photo) => {
		try {
			const granted = await PermissionsAndroid.requestMultiple(
				[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
				]);
			if (granted['android.permission.WRITE_EXTERNAL_STORAGE'] == 'granted') {
				CameraRoll.saveToCameraRoll(photo.uri);
				console.log('Permisiion successfully got', granted, photo.uri);
			} else {
				console.log('CameraRoll permission denied', granted, photo.uri);
			}
		} catch (err) {
			console.error('Failed to request permission ', err);
			return null;
		}
	};
	capture =  async function() {
		if (this.camera) {
			const date =  new Date();
			const day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
			const month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
			const year = date.getFullYear();
			const hour = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
			const minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
			const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			const currentDate = Number(year+''+month+''+day+''+hour+''+minutes+''+seconds);

			let photo = await this.camera.takePictureAsync({skipProcessing: true});
			this.props.changeCamera(false);
			this.requestPermission(photo);
			console.log('камера отработала',photo);
			
			this.props.addPhoto({
				id:  currentDate,
				path: photo.uri
			});
		}
	};

	render() {
    console.log('Render_camera this',this);
		return (
			<Modal
				animationType="slide"
				transparent={true}
 				visible={this.state.visible}
				onRequestClose={this.closeCamera}>
				<View style={styles.modal}>
					<TouchableOpacity style={styles.close} onPress={this.closeCamera}>
						<Icon name="close" style={{ color: 'white' }} size={40} />
					</TouchableOpacity>
					<RNCamera
						flashMode={RNCamera.Constants.FlashMode.on}
						ref={ref => {
							this.camera = ref;
						  }}
						style={styles.camera}>
					</RNCamera>
					<TouchableOpacity style={styles.capture} onPress={this.capture.bind(this)}>
						<Text style={styles.capture_text}>Сделать снимок</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		);
	}
});