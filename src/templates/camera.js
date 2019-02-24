import React,{Component} from 'react';
import {CameraRoll,ImageEditor,ImageStore,PermissionsAndroid,Platform,Modal,Text,TouchableOpacity,View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import config from '../config';

import alert from '../services/alert';

import f from '../functions';

import Icon from 'react-native-vector-icons/EvilIcons';

const styles = EStyleSheet.create({
	modal: {
		flex: 1,
	},
	camera: {
		flex: 1,
	},
	close_area: {
		alignItems: 'flex-end',
		width: '100%',
		marginTop: 15,
		// backgroundColor: '#fff',
	},
	close: {
		margin: 15, padding: 15,
		borderRadius: 15,
		backgroundColor: 'rgba(255,255,255,0.1)',
		zIndex: 10,
	},
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingVertical: 15,
		backgroundColor: '#000',
	},
	capture: {
		paddingVertical: 15, paddingHorizontal: 30,
		borderRadius: 100,
		backgroundColor: '$red',
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
		fontSize: 18, fontFamily: 'GothamPro',
		lineHeight: 19,
	},
});

export default withNavigation(class Camera extends Component {

	// Запрос разрешений на андроиде
	request_permission = async (photo) => {
		try {
			const granted = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
			]);
			if(granted['android.permission.WRITE_EXTERNAL_STORAGE'] == 'granted') {
				CameraRoll.saveToCameraRoll(photo.uri);
				console.log('Permission successfully got',granted,photo.uri);
				return true;
			} else {
				console.log('CameraRoll permission denied',granted,photo.uri);
				return false;
			}
		} catch (err) {
			console.log('Failed to request permission',err);
			return false;
		}
	};

	// Съемка
	capture = async () => {
		if(this.camera) {

			// Открываем крутилку
			// this.props.open_smoke();
			// let photo = await this.camera.takePictureAsync({base64:true,doNotSave:true});
			//
			// await this.props.add_photo({
			// 	id: "Coca Cola Promo "+f.date("Y-m-d H:i:s"),
			// 	...photo,
			// });
			// this.props.close_smoke();

			let id = "Coca Cola Promo "+f.date("Y-m-d H:i:s");
			this.props.add_photo({id,state:'saving'});

			let photo = await this.camera.takePictureAsync({width:config.image.width,base64:true,pauseAfterCapture:true});
			// ImageEditor.cropImage(photo.uri,{displaySize:{width:1080,resizeMode:'cover'}},async (image_uri) => {
			// 	console.log(ImageStore.hasImageForTag(image_uri,_ => console.log(_)));
			// 	ImageStore.getBase64ForTag(image_uri,async (base64) => {
			// 		photo.base64 = base64;
					if(Platform.OS == 'android') {
						let access = await this.request_permission(photo);
						if(!access) {
							await alert("Невозможно сделать фотографию","Вы не дали приложению разрешение на использование камеры и хранилища фотографий");
							this.props.remove_photo(id);
							this.props.close();
							return;
						}
					}
					photo.state = 'ready';
					this.props.set_photo({id,photo});

					// И закрываем камеру
					this.props.close();
			// 	},error => console.log("1",error));
			// },error => console.log("2",error));
		}
	};

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
 				visible={this.props.visible}
				onRequestClose={this.props.close}
			>
				<View style={styles.modal}>
					<RNCamera
						ref={ref => this.camera=ref}
						style={styles.camera}
						captureAudio={false}
						flashMode={RNCamera.Constants.FlashMode.off}
						pauseAfterCapture={true}
					>
						<View style={styles.close_area}>
							<TouchableOpacity style={styles.close} onPress={this.props.close}>
								<Icon name="close" style={{color:'white'}} size={40} />
							</TouchableOpacity>
						</View>
					</RNCamera>
					<View style={styles.footer}>
						<TouchableOpacity style={styles.capture} onPress={this.capture}>
							<Text style={styles.capture_text}>Сделать снимок</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}
});
