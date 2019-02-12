import React,{Component} from 'react';
import {CameraRoll,PermissionsAndroid,Platform,FlatList,Image,ImageBackground,Modal,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import f from '../functions';

import Icon from 'react-native-vector-icons/EvilIcons';

const styles = EStyleSheet.create({
	modal: {
		flex: 1,
	},
	camera: {
		flex: 1,
		height: '100%',
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
	// close: {
	// 	position: 'absolute', top: 30, right: 15,
	// 	zIndex: 10,
	// },
	capture: {
		alignSelf: 'center',
		position: 'absolute', bottom: 30,
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

	request_permission = async (photo) => {
		if(Platform.OS == 'android') try {
			const granted = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
			]);
			if(granted['android.permission.WRITE_EXTERNAL_STORAGE'] == 'granted') {
				CameraRoll.saveToCameraRoll(photo.uri);
				console.log('Permisiion successfully got',granted,photo.uri);
			} else {
				console.log('CameraRoll permission denied',granted,photo.uri);
			}
		} catch (err) {
			console.error('Failed to request permission',err);
			return null;
		}
	};
	capture = async () => {
		if(this.camera) {
			this.props.close();
			let photo = await this.camera.takePictureAsync({base64:true,doNotSave:true});
			// await this.request_permission(photo);

			this.props.add_photo({
				id: "Coca Cola Promo "+f.date("Y-m-d H:i:s"),
				...photo,
			});
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
					>
						<View style={styles.close_area}>
							<TouchableOpacity style={styles.close} onPress={this.props.close}>
								<Icon name="close" style={{color:'white'}} size={40} />
							</TouchableOpacity>
						</View>
						<TouchableOpacity style={styles.capture} onPress={this.capture}>
							<Text style={styles.capture_text}>Сделать снимок</Text>
						</TouchableOpacity>
					</RNCamera>
				</View>
			</Modal>
		);
	}
});
