import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import SubTitle		from '../../../templates/subtitle';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		justifyContent: 'flex-end',
		height: 140,
		padding: 20, paddingTop: 50,
		backgroundColor: '#000',
	},
	title: {
		marginBottom: 20,
		color: '#fff',
		fontSize: 24, fontWeight: 'bold',
		textShadowRadius: 5, textShadowColor: '#111',
	},
	ending: {
		color: '#fff',
		fontSize: 18,
		textShadowRadius: 5, textShadowColor: '#111',
	},

	area: {
		flex: 1,
		padding: 20,
	},
	description_area: {
		flex: 1,
	},
	description: {
		color: '#111',
		fontSize: 16,
	},

	participate_area: {
		alignItems: 'center',
		padding: 15,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},
	participate_button: {
		alignItems: 'center',
		width: '100%',
		paddingVertical: 15, paddingHorizontal: 50,
		borderRadius: 100,
		backgroundColor: 'red',
	},
	participate_text: {
		color: '#fff',
		fontSize: 16, fontWeight: 'bold',
	},
});

export default withNavigation(({navigation}) => {
	let data  = navigation.getParam('data');
	let promo = navigation.getParam('promo');

	if(!data.image_url) data.image_url = promo.image_url || 'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg';

	data.diff = Math.ceil(((+new Date(data.end))-(+new Date()))/(24*60*60*1000));
	if(data.diff >= 0) {
		if(data.diff == 0) {
			data.diff_text = 'сегодня';
		} else if(data.diff == 1) {
			data.diff_text = 'завтра';
		} else {
			let day = 'день';
			if(data.diff > 1 && data.diff < 5)													day = 'дня';	// от 2 до 4
			else if(data.diff == 0 || data.diff > 4 && data.diff < 21)							day = 'дней';	// от 5 до 20 и 0
			else if(data.diff.toString().substr(-1) > 1 && data.diff.toString().substr(-1) < 5)	day = 'дня';	// с последней цифрой от 2 до 5
			else if(data.diff.toString().substr(-1) != 1)										day = 'дней';	// с последней цифрой 0 и от 6 до 9

			data.diff_text = 'через '+data.diff+' '+day;
		}
		data.diff_text = 'Заканчивается '+data.diff_text;
	} else {
		data.diff_text = 'Акция закончилась';
		data.can_participate = false;
	}


	return (
		<View style={styles.container}>
			<ImageBackground style={styles.banner} imageStyle={{opacity:0.7}} source={{uri:data.image_url}}>
				<Text style={styles.title}>{promo.title?.toUpperCase()}</Text>
				{data ? (
					<Text style={styles.ending}>{data.diff_text}</Text>
				) : null}
			</ImageBackground>
			{data.description?.length ? (
			<View style={styles.area}>
				<SubTitle style={{paddingBottom:10}} text="Условия акции" />
				<ScrollView style={styles.description_area} scrollEnabled={data.description.length>1000}>
					<Text style={styles.description}>{data.description+'\n'}</Text>
				</ScrollView>
			</View>
			) : null}
			{data.can_participate ? (
			<View style={styles.participate_area}>
				<TouchableOpacity style={styles.participate_button} onPress={_=>{return;navigation.push('promo_participate',{data})}}>
					<Text style={styles.participate_text}>Участвовать</Text>
				</TouchableOpacity>
			</View>
			) : null}
		</View>
	);
});
