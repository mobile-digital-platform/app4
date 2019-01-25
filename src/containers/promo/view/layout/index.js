import React from 'react';
import {FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import SubTitle		from '../../../../templates/subtitle';
// import BackgroundImage from '../../../../templates/background_image';

import Retailer		from './retailer';
import Separator	from './separator';

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
	image: {
		opacity: 0.7,
	},
	title: {
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro', fontWeight: 'bold',
		textShadowRadius: 5, textShadowColor: '#111',
		lineHeight: 21,
	},

	area: {
		padding: 20,
	},
	description: {
		color: '#111',
		fontSize: 14,
		lineHeight: 18,
	},

	retailers: {
		paddingTop: 20,
	},
});

export default withNavigation(({navigation,data}) => {
	if(data.promo_list) data.promo_list = data.promo_list.filter(e => e.retailer.id>0);

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.banner} imageStyle={styles.image} source={{uri:data.image_url}}>
				<Text style={styles.title}>{data.title?.toUpperCase()}</Text>
			</ImageBackground>
			<ScrollView>
				{data.description?.length ? (
					<View style={styles.area}>
						<SubTitle style={{paddingBottom:10}} text="Условия акции" />
						<Text style={styles.description}>{data.description}</Text>
					</View>
				) : null}
				<View style={styles.retailers}>
					<SubTitle style={{paddingHorizontal:20}} text="Где проводится" />
					<FlatList
						data={data.promo_list}
						renderItem={({item}) => (<Retailer data={item} extra={data} />)}
						ItemSeparatorComponent={Separator}
						keyExtractor={item => ''+item.id}
					/>
				</View>
			</ScrollView>
		</View>
	);
});
