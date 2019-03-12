import React,{Component} from 'react';
import {StyleSheet,Image,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import promo_date_diff from '../../../../services/promo_date_diff';

const styles = EStyleSheet.create({
	container: {
		alignItems: 'flex-start',
		margin: 10,
	},
	image: {
		height: 120, width: '100%',
		backgroundColor: '#eee',
	},
	big_image: {
		height: 350,
	},
	retailer_area: {
		alignItems: 'flex-end',
		width: '100%',
		marginTop: -25, marginBottom: -15,
		paddingRight: 10,
		shadowOpacity: 1, shadowOffset: {height:0,width:0}, shadowRadius: 1, shadowColor: '#111',
	},
	retailer_image: {
		height: 40, width: 40,
		borderRadius: 20,
		backgroundColor: '#eee',
	},
	area: {
		width: '100%',
		padding: 20,
		borderWidth: 1, borderTopWidth: 0, borderColor: '#ccc',
	},
	title: {
		fontSize: 14, fontFamily: 'GothamPro-Bold',
		lineHeight: 19,
	},
	ending: {
		marginTop: 6,
		fontSize: 12, fontFamily: 'GothamPro',
	},
});

export default withNavigation(class MyListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image_url: this.props.data.image_url,
			image_height: styles[(this.props.big ? 'big_' : '')+'image'].height,
		}
	}

	componentDidMount() {
		Image.getSize(this.state.image_url,(width,height) => {
			if(0.8*height<this.state.image_height) this.setState({image_height:0.8*height});
		},error => {
			this.setState({image:'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg'});
		});
	}

	render() {
		let data = this.props.data;

		data = promo_date_diff(data);

		return (
			<TouchableOpacity style={styles.container} onPress={_=>this.props.navigation.push('promo_my_view',{id:data.id})}>
				<Image style={[styles.image,{height:this.state.image_height}]} source={{uri:this.state.image_url}} />
				<View style={styles.retailer_area}>
					<Image style={styles.retailer_image} source={{uri:data.retailer.image_url}} />
				</View>
				<View style={styles.area}>
					<Text style={styles.title}>{data.title?.toUpperCase()}</Text>
					<Text style={styles.ending}>{data.diff_text}</Text>
				</View>
			</TouchableOpacity>
		);
	}
});
