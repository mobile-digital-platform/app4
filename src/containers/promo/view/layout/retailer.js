import React from 'react';
import {Linking,StyleSheet,Image,ImageBackground,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		padding: 20,
	},
	image_area: {
		height: 50, width: 50,
		borderRadius: 25,
		backgroundColor: '#fff',
	},
	image: {
		height: '100%', width: '100%',
	},
	area: {
		flex: 1,
		marginLeft: 20,
		// backgroundColor: '#eee',
	},
	title: {
		fontSize: 20, fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	about: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 5,
	},
	link_area: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	link: {
		marginBottom: 5,
		fontSize: 16,
	},
	participate: {
		paddingVertical: 10, paddingHorizontal: 20,
		borderRadius: 50,
		backgroundColor: 'red',
	},
	participate_text: {
		color: '#fff',
		fontSize: 16, fontWeight: 'bold',
	},
});

export default withNavigation(({navigation,data,extra}) => {
	// if(!data.network.image_url) data.network.image_url = 'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg';

	return (
		<TouchableOpacity style={styles.container} onPress={_=>navigation.push('promo_details',{data,promo:extra})}>
			<View style={styles.image_area}>
			{data.network.image_url ? (
			 	<Image style={styles.image} source={{uri:data.network.image_url}} />
			) : null}
			</View>
			<View style={styles.area}>
				<Text style={styles.title}>{data.network.name}</Text>
				<View style={styles.about}>
					{data.link ? (
					<TouchableOpacity
						style={styles.link_area}
						onPress={_=>Linking.openURL(data.link)/*navigation.push('web',{title:'Сайт акции',source:data.link})*/}
					>
						<Text style={styles.link}>Сайт акции</Text>
						<Icon name="chevron-right" style={{color:'red'}} size={30} />
					</TouchableOpacity>
					) : null}
					<TouchableOpacity style={styles.participate} onPress={_=>navigation.push('promo_details',{data,promo:extra})}>
						<Text style={styles.participate_text}>Подробнее</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);
});
