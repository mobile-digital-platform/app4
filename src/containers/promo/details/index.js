import React from 'react';
import {Platform,StyleSheet,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View,WebView} from 'react-native';
import {withNavigation} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import SubTitle from '../../../templates/subtitle';

import promo_date_diff from '../../../services/promo_date_diff';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		justifyContent: 'flex-end',
		height: 120,
		padding: 20, paddingBottom: 10,
		backgroundColor: '#000',
	},
	title: {
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro-Medium',
		textShadowRadius: 5, textShadowColor: '#111',
		lineHeight: 21,
	},
	ending: {
		color: '#fff',
		fontSize: 14,
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
		paddingTop: Platform.select({ios:3,android:0}),
		color: '#fff',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
});

const stylize = (html) => (
`
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style>
@font-face {
	font-family: "GothamPro"; src: url('file:///assets/fonts/GothamPro.ttf') format('truetype');
}
html {
}
body {
	color: #111;
	font-size: `+(14*Platform.select({ios:(3*EStyleSheet.value('$scale')),android:(EStyleSheet.value('$scale'))}))+`px;
	font-family: "GothamPro",Arial;
	line-height: `+(18*Platform.select({ios:(3*EStyleSheet.value('$scale')),android:(EStyleSheet.value('$scale'))}))+`px;
}
p,li {
}
img {
	max-width: 100%;
}
.container {
	margin: `+(20*Platform.select({ios:(3*EStyleSheet.value('$scale')),android:(EStyleSheet.value('$scale'))}))+`px;
}
.mobile_title {
	margin-bottom: 9px;
	color: #b3b3b3;
	font-size: `+(10*Platform.select({ios:(3*EStyleSheet.value('$scale')),android:(EStyleSheet.value('$scale'))}))+`px;
	font-family: "GothamPro",Arial; font-weight: bold;
	text-transform: uppercase;
}
</style>
</head>
<body>
<div class="container">
<div class="mobile_title">Где проводится</div>
`+html+`
</div>
</body>
</html>
`
);

export default withNavigation(({navigation}) => {
	let data  = navigation.getParam('data');
	let promo = navigation.getParam('promo');

	if(!data.image_url) data.image_url = promo.image_url || 'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg';

	data = promo_date_diff(data);

	// navigation.push('promo_participate',{data});

	console.log(stylize(data.description));

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.banner} imageStyle={{opacity:0.7}} source={{uri:data.image_url}}>
				<Text style={styles.title}>{promo.title?.toUpperCase()}</Text>
				{data ? (
					<Text style={styles.ending}>{data.diff_text}</Text>
				) : null}
			</ImageBackground>
			{data.retailer.image_url ? (
			<View style={styles.retailer_area}>
				<Image style={styles.retailer_image} source={{uri:data.retailer.image_url}} />
			</View>
			) : null}
			{data.description?.length ? (
			<View style={styles.area}>
				<WebView style={styles.description_area} source={{html:stylize(data.description)}} useWebKit={true} />
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
