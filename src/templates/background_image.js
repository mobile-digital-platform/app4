import React,{Component} from 'react';
import {ImageEditor,NativeModules,StyleSheet,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';

// import ImagePicker from 'react-native-image-crop-picker';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		height: 140,
		backgroundColor: '#000',
	},
	image: {
		height: 140, width: '100%',
		opacity: 0.7,
	},
	children: {
		marginTop: -140,
		padding: 20,
		backgroundColor: 'transparent',
	}
});

export default class PromoViewLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image_url: this.props.image_url,
			image_height: '100%',
		};
	}

	componentDidMount() {
		/*
		Image.getSize(this.state.image_url,(width,height) => {
			this.setState({image_height:height});
		},error => {
			this.setState({image_url:'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg'});
		});
		ImageEditor.cropImage('https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg',{size:{height:140}},image_url => {
			// this.setState({image_url});
		},err => {
			console.log(err);
		});
		*/
		// ImagePicker.openCropper({
		// 	path: this.state.image_url,
		// 	height: 140,
		// }).then(image => console.log(image));
	}

	render() {
		let {props,state} = this;
		return (
			<View style={styles.container}>
			 	<Image style={[styles.image,props.image_style]} image={{uri:state.image_url}} />
				<View style={[styles.children,props.style]}>{this.props.children}</View>
			</View>
		);
	}
}
