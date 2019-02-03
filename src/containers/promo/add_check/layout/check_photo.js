import React,{Component} from 'react';
import {Image,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import CameraImage	from '../../../../../assets/ui/camera.png';

import Photo	from '../../../../templates/scan';
import Camera	from '../../../../templates/camera';

const styles = EStyleSheet.create({
	container: {
		padding: 20,
	},
	text: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
		textAlign: 'center',
	},
	photo_area: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		marginTop: 15,
	},
	camera_area: {
		marginHorizontal: 5,
	},
	camera: {
		height: 90, width: 90,
		borderRadius: 18,
	},
	error_text: {
		marginLeft: 20, marginBottom: 10,
		fontSize: 14,
		color: '$red',
	},
});

export default withNavigation(class CheckPhoto extends Component {
	state = {
		camera: false,
	};

	open_camera  = () => this.setState({camera:true});
	close_camera = () => this.setState({camera:false});

	render() {
		let {props,state} = this;
		console.log("CheckPhoto",state);

		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					Сфотографируйте чек так, чтобы были видны название магазина, список товаров, сумма, дата, фискальные данные (ФН, ФД, ФП), и QR-код.
				</Text>
				<View style={styles.photo_area}>
					{props.photo[0] ? (<Photo photo={props.photo[0]} remove={props.remove_photo} />) : null}
					{props.photo[1] ? (<Photo photo={props.photo[1]} remove={props.remove_photo} />) : null}
					{props.photo[2] ? (<Photo photo={props.photo[2]} remove={props.remove_photo} />) : null}
					{props.photo.length<3 ? (
						<TouchableOpacity style={styles.camera_area} onPress={this.open_camera}>
							<Image style={styles.camera} source={CameraImage} />
						</TouchableOpacity>
					) : null}
				</View>
				{props.photo_error ? (<Text style={styles.error_text}>{props.photo_error}</Text>) : null}
				<Camera visible={state.camera} add_photo={props.add_photo} close={this.close_camera} />
			</View>
		);
	}
});
