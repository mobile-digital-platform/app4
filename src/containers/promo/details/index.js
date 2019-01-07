import React from 'react';
import {StyleSheet,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View,WebView} from 'react-native';
import {withNavigation} from 'react-navigation';

import SubTitle from '../../../templates/subtitle';

import promo_date_diff from '../../../services/promo_date_diff';

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
		fontSize: 24, fontFamily: 'GothamPro-Medium',
		textShadowRadius: 5, textShadowColor: '#111',
	},
	ending: {
		color: '#fff',
		fontSize: 18,
		textShadowRadius: 5, textShadowColor: '#111',
	},
	retailer_area: {
		alignItems: 'flex-end',
		width: '100%',
		marginTop: -25, marginBottom: -15,
		paddingRight: 10,
	},
	retailer_image: {
		height: 40, width: 40,
		borderRadius: 20,
		backgroundColor: '#eee',
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
		paddingTop: 3,
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro-Medium',
	},
});

const stylize = (html) => (
`
<style>
html {
	border: 0;
}
body {
	margin: 0;
}
p,li {
	font-size: 14px;
	font-family: "GothamPro";
}
img {
	max-width: 100%;
}
</style>`+
'<p>'+html+'</p>'+
'<p><b>Второй</b> абзац самого <i>длинного</i> текста, взятого не из апи.</p>'+
'<ul>'+
	'<li>1'+
	'<li>2'+
	'<li>3'+
'</ul>'+
'<img src="https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg" />'+
'<p><b>Второй</b> абзац самого <i>длинного</i> текста, взятого не из апи.</p>'
);

export default withNavigation(({navigation}) => {
	let data  = navigation.getParam('data');
	let promo = navigation.getParam('promo');

	if(!data.image_url) data.image_url = promo.image_url || 'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg';

	data = promo_date_diff(data);

	// navigation.push('promo_participate',{data});

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.banner} imageStyle={{opacity:0.7}} source={{uri:data.image_url}}>
				<Text style={styles.title}>{promo.title?.toUpperCase()}</Text>
				{data ? (
					<Text style={styles.ending}>{data.diff_text}</Text>
				) : null}
			</ImageBackground>
			<View style={styles.retailer_area}>
				<Image style={styles.retailer_image} source={{uri:data.retailer.image_url}} />
			</View>
			{data.description?.length ? (
			<View style={styles.area}>
				<SubTitle style={{paddingBottom:10}} text="Условия акции" useWebKit={true} />
				<WebView style={styles.description_area} source={{html:stylize(data.description)}} />
			</View>
			) : null}
			{data.can_participate ? (
			<View style={styles.participate_area}>
				{data.participation ? (
					<TouchableOpacity style={styles.participate_button} onPress={_=>navigation.push('promo_my_view',{data})}>
						<Text style={styles.participate_text}>Перейти к акции</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={styles.participate_button} onPress={_=>navigation.push('promo_participate',{data})}>
						<Text style={styles.participate_text}>Участвовать</Text>
					</TouchableOpacity>
				)}
			</View>
			) : null}
		</View>
	);
});
