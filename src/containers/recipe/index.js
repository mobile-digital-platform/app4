import React,{Component} from 'react';
import {Linking,Platform,StyleSheet,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View,WebView} from 'react-native';
import {withNavigation} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import NoBanner		from '../../../assets/ui/promo_no_banner.png';

import SubTitle		from '../../templates/subtitle';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		justifyContent: 'flex-end',
		height: 120,
		padding: 20,
		backgroundColor: '#000',
	},
	title: {
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro-Bold',
		textShadowRadius: 5, textShadowColor: '#111',
		lineHeight: 21,
	},
	ending: {
		color: '#fff',
		fontSize: 12, fontFamily: 'GothamPro',
		textShadowRadius: 5, textShadowColor: '#111',
	},
	retailer_area: {
		alignItems: 'flex-end',
		width: '100%',
		marginTop: -30, marginBottom: -10,
		paddingRight: 10,
		zIndex: 1,
	},
	retailer_image: {
		height: 40, width: 40,
		borderRadius: 20,
		backgroundColor: '#eee',
	},

	area: {
		flex: 1,
		zIndex: -1,
	},
	description_area: {
		flex: 1,
	},
	description: {
		color: '#111',
		fontSize: 16,
	},

	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	empty_text: {
		paddingBottom: '20%',
		color: '#3d3d3d',
		fontSize: 12, fontFamily: 'GothamPro',
		textAlign: 'center',
		lineHeight: 16,
	},
});

export default withNavigation(class Recipe extends Component {
	state = {
		list: [],
		loading: false,
	};

	get_data = (id) => {
	}

	render() {

		return (
			<View style={styles.container}>
				<ImageBackground style={styles.banner} imageStyle={{opacity:0.5}} source={NoBanner}>
					<Text style={styles.title}>{'Готовы к вкусному ужину?'.toUpperCase()}</Text>
				</ImageBackground>
				<View style={styles.area}>
				</View>
			</View>
		);
	}
});
