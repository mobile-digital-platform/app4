import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import SubTitle		from '../../../../templates/subtitle';

import Retailer		from './retailer';
import Separator	from './separator';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		justifyContent: 'flex-end',
		height: 140,
		padding: 20,
		backgroundColor: '#000',
	},
	title: {
		marginBottom: 20,
		color: '#fff',
		fontSize: 24, fontFamily: 'GothamPro-Bold',
		textShadowRadius: 5, textShadowColor: '#111',
	},

	area: {
		padding: 20,
	},
	description: {
		color: '#111',
		fontSize: 16,
	},

	retailers: {
		paddingTop: 20,
	},
});

export default withNavigation(({navigation,data}) => {
	console.log(data);
	// data.retailer = data.retailer?.filter(e => e.active);

	return (
		<View style={styles.container}>
			<ImageBackground style={styles.banner} imageStyle={{opacity:0.7}} source={{uri:data.image_url}}>
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
					<SubTitle style={{paddingBottom:10,paddingHorizontal:20}} text="Где проводится" />
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
