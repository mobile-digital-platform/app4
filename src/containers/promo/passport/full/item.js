import React,{Component} from 'react';
import {Image,TouchableOpacity,Text,TextInput,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import CameraImage		from '../../../../../assets/ui/camera.png';

import Camera			from '../../../../templates/camera';
import Photo			from '../../../../templates/scan';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
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
		marginLeft: 20,
		color: '#3D3D3D',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
	}
});

export default class PromoPassportPhotoLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			camera_opened: false,
			photo: {},
		};
	}

	// Камера
	open_camera		= () => this.setState({camera_opened:true});
	close_camera	= () => this.setState({camera_opened:false});

	// Фотографии
	add_photo		= async (photo)	=> await this.setState({photo});
	set_photo		= async ({photo}) => {
		await this.setState(state => ({photo:{...state.photo,...photo}}));
		this.props.add_photo(this.state.photo);
	}
	remove_photo	= async () => {
		await this.setState({photo:{}});
		this.props.remove_photo();
	}

	render() {
		let {props,state} = this;

		return (
			<View style={styles.container}>
				{state.photo.id ? (
					<Photo photo={state.photo} remove={this.remove_photo} />
				) : (
					<TouchableOpacity style={styles.camera_area} onPress={this.open_camera}>
						<Image style={styles.camera} source={CameraImage} />
					</TouchableOpacity>
				)}
				<Text style={styles.text}>{props.text}</Text>
				<Camera
					visible={state.camera_opened}
					close={this.close_camera}
					add_photo={this.add_photo}
					set_photo={this.set_photo}
					remove_photo={this.remove_photo}
				/>
			</View>
		);
	}
}
