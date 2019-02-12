import React,{Component} from 'react';
import {Image,ImageBackground,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		alignItems: 'flex-start',
		margin: 10,
	},
	image: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		flexWrap: 'wrap',
		height: 120, width: '100%',
		backgroundColor: '#eee',
	},
	big_image: {
		height: 350,
	},
	retailer_area: {
		height: 40, width: 40,
		margin: 5,
		borderRadius: 20,
	    shadowColor: '#111',
	    shadowOffset: {width:0,height:0},
	    shadowOpacity: 1,
	    shadowRadius: 5,
	    elevation: 1,
	},
	retailer: {
		height: 40, width: 40,
		borderRadius: 20,
	},
	area: {
		width: '100%',
		borderWidth: 1, borderTopWidth: 0, borderColor: '#ccc',
	},
	title: {
		margin: 20,
		fontSize: 14, fontFamily: 'GothamPro-Bold',
		lineHeight: 19,
	},
});

export default withNavigation(class ListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image_url: props.data.main_image_url ?? props.data.image_url,
			image_height: styles[(props.big ? 'big_' : '')+'image'].height,
		};
	}

	componentDidMount() {
		Image.getSize(this.state.image_url,(width,height) => {
			if(0.8*height<this.state.image_height) this.setState({image_height:0.8*height});
		},error => {
			this.setState({image_url:'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg'});
		});
	}

	render() {
		let data = this.props.data;
		let retailer_list = data.promo_list.slice(0,6).map(e => e.retailer.image_url);

		return (
			<TouchableOpacity style={styles.container} onPress={_=>this.props.navigation.push('promo_view',{id:data.id})}>
				<Image style={[styles.image,{height:this.state.image_height}]} source={{uri:this.state.image_url}} />
				<View style={styles.area}><Text style={styles.title}>{data.title?.toUpperCase()}</Text></View>
			</TouchableOpacity>
		);
	}
});
