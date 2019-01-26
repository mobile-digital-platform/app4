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
		this.props.changeCamera({visible: false});
	}
	capture =  async function() {
		if (this.camera) {
			const date =  new Date();
			const day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
			const month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
			const year = date.getFullYear();
			const hour = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
			const minutes = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
			const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
			const currentDate = Number(year+''+month+''+day+''+hour+''+minutes+''+seconds);

			let data = await this.camera.takePhotoAsync({exif:true});
			this.props.changeCamera({visible: false});
			this.props.addPhoto({
				id:  currentDate,
				value: data.uri
			});
		  // сохранение фото в галлерею
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