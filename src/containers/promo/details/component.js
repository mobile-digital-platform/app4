import React,{Component} from 'react';
import {Platform,StyleSheet,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View,WebView} from 'react-native';
import {withNavigation} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import NoBanner		from '../../../../assets/ui/promo_no_banner.png';

import SubTitle		from '../../../templates/subtitle';

import promo_date_diff from '../../../services/promo_date_diff';

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
		backgroundColor: '$red',
	},
	participate_text: {
		color: '#fff',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
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

const stylize = (html) => (
`
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=width, initial-scale=`+EStyleSheet.value('$scale')+
	`, maximum-scale=`+EStyleSheet.value('$scale')+`, user-scalable=`+EStyleSheet.value('$scale')+`" />
<style>
@font-face {
	font-family: "GothamPro";
	src: url("file:///assets/fonts/GothamPro.ttf");
}
html {
}
body {
	color: #111;
	font-size: 14px;
	font-family: "GothamPro",Arial;
	line-height: 18px;
}
p,li {
}
img {
	display: block;
	max-width: 100%;
	margin: 0px auto;
}
.container {
	margin: 18px;
}
.mobile_title {
	margin-bottom: 9px;
	color: #b3b3b3;
	font-size: 10px;
	font-family: "GothamPro",Arial; font-weight: bold;
	text-transform: uppercase;
}
</style>
</head>
<body>
<div class="container">
<div class="mobile_title">Условия акции</div>
`+html+`
</div>
</body>
</html>
`
);

export default withNavigation(class PromoDetails extends Component {
	constructor(props) {
		super(props);

		let navigation = props.navigation;

		this.id = navigation.getParam('id',0);
		let data = this.get_data(this.id);

		this.state = {data};
	}

	componentDidUpdate(prev_props) {
		if(!Object.is(prev_props,this.props)) {
			let navigation = this.props.navigation;
			let data = this.get_data(this.id);
			this.setState({data});
		}
	}

	get_data = (id) => {
		for(let group of this.props.promo) {
			console.log(group.promo_list);
			let data = group.promo_list.find(e => e.id==id);
			if(data) return data;
		}
	}

	render() {
		let navigation = this.props.navigation;
		let {data} = this.state;

		if(!data) return (
			<View style={styles.empty}><Text style={styles.empty_text}>Не удалось загрузить данные об акции</Text></View>
		);

		// if(!data.image_url) data.image_url = 'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg';
		const Banner = data.image_url ? {uri:data.image_url} : NoBanner;

		data = promo_date_diff(data);

		// navigation.push('promo_participate',{data});

		return (
			<View style={styles.container}>
				<ImageBackground style={styles.banner} imageStyle={{opacity:0.5}} source={Banner}>
					<Text style={styles.title}>{data.title?.toUpperCase()}</Text>
					{data ? (
						<Text style={styles.ending}>{data.diff_text}</Text>
					) : null}
				</ImageBackground>
				{data.retailer?.image_url ? (
				<View style={styles.retailer_area}>
					<Image style={styles.retailer_image} source={{uri:data.retailer?.image_url}} />
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
						<TouchableOpacity style={styles.participate_button} onPress={_=>navigation.push('promo_my_view',{id:data.id})}>
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
	}
});
