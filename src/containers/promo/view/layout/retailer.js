import React from 'react';
import {Linking,Platform,Image,ImageBackground,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Arrow from '../../../../../assets/ui/right_arrow.png';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		padding: 20,
	},
	image_area: {
		height: 40, width: 40,
		borderRadius: 20,
		backgroundColor: '#fff',
	},
	image: {
		height: '100%', width: '100%',
	},
	area: {
		flex: 1,
		marginLeft: 10,
		// backgroundColor: '#eee',
	},
	title: {
		color: '#3d3d3d',
		fontSize: 16, fontFamily: 'GothamPro-Bold',
		lineHeight: 19,
	},
	about: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 5,
	},
	link_area: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	link: {
		marginBottom: Platform.select({ios:2,android:5}), paddingTop: 3,
		fontSize: 14, fontFamily: 'GothamPro-Medium',
		lineHeight: 16,
	},
	link_arrow: {
		height: 20, width: 20,
	},
	participate: {
		paddingVertical: 7, paddingHorizontal: 16,
		borderRadius: 50,
		backgroundColor: 'red',
	},
	participate_text: {
		color: '#fff',
		fontSize: 12, fontFamily: 'GothamPro-Medium',
		lineHeight: 16,
	},
});

export default withNavigation(({navigation,data,extra}) => {
	// if(!data.retailer.image_url) data.retailer.image_url = 'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg';

	return (
		<View style={styles.container}>
			<View style={styles.image_area}>
			{data.retailer.image_url ? (
			 	<Image style={styles.image} source={{uri:data.retailer.image_url}} />
			) : null}
			</View>
			<View style={styles.area}>
				<Text style={styles.title}>{data.retailer.title?.toUpperCase()}</Text>
				<View style={styles.about}>
					<TouchableOpacity style={styles.participate} onPress={_=>navigation.push('promo_details',{id:data.id,group_id:extra.id})}>
						<Text style={styles.participate_text}>Подробнее</Text>
					</TouchableOpacity>
					{data.site_link ? (
					<TouchableOpacity
						style={styles.link_area}
						onPress={_=>Linking.openURL(data.site_link)}
					>
						<Text style={styles.link}>Сайт акции</Text>
						<Image style={styles.link_arrow} source={Arrow} />
					</TouchableOpacity>
					) : null}
				</View>
			</View>
		</View>
	);
});
