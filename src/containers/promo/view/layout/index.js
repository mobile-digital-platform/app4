import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import SubTitle		from '../../../../templates/subtitle';

import Retailer		from './retailer';
import Separator	from './separator';

const styles = StyleSheet.create({
	container: {
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
		fontSize: 24, fontWeight: 'bold',
		textShadowRadius: 5, textShadowColor: '#111',
	},
	subtitle: {
		paddingBottom: 10,
		color: '#bbb',
		fontSize: 16, fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	ending: {
		color: '#fff',
		fontSize: 18,
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
		paddingVertical: 20,
	},
});

export default withNavigation(({navigation,data}) => {
	data.retailer = data.retailer?.filter(e => e.active);

	return (
		<ScrollView style={styles.container}>
			<ImageBackground style={styles.banner} imageStyle={{opacity:0.7}} source={{uri:data.image_url}}>
				<Text style={styles.title}>{data.title?.toUpperCase()}</Text>
			</ImageBackground>
			{data.description?.length ? (
				<View style={styles.area}>
					<SubTitle style={{paddingBottom:10}} text="Условия акции" />
					<Text style={styles.description}>{data.description}</Text>
				</View>
			) : null}
			<View style={styles.retailers}>
				<SubTitle style={{paddingBottom:10,paddingHorizontal:20}} text="Где проводится" />
				<FlatList
					data={data.retailer}
					renderItem={({item}) => (<Retailer data={item} extra={data} />)}
					ItemSeparatorComponent={Separator}
					keyExtractor={item => ''+item.id}
				/>
			</View>
		</ScrollView>
	);
});
