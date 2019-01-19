import React,{Component} from 'react';
import {StyleSheet,Image,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		margin: 10,
		// backgroundColor: '#eee',
	},
	image: {
		height: 150, width: '100%',
		backgroundColor: '#eee',
	},
	big_image: {
		height: 350,
	},
	area: {
		width: '100%',
		borderWidth: 1, borderTopWidth: 0, borderColor: '#ccc',
	},
	title: {
		margin: 20, paddingTop: 3,
		fontSize: 20, fontFamily: 'GothamPro',
	},
});

export default withNavigation(class ListItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image_url: this.props.data.image_url,
			image_height: styles[(this.props.big ? 'big_' : '')+'image'].height,
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

		return (
			<TouchableOpacity style={styles.container} onPress={_ => this.props.navigation.push(this.props.my ? 'promo_my_view' : 'promo_view',{data})}>
				<Image style={[styles.image,{height:this.state.image_height}]} source={{uri:this.state.image_url}} />
				<View style={styles.area}><Text style={styles.title}>{data.title?.toUpperCase()}</Text></View>
			</TouchableOpacity>
		);
	}
});
