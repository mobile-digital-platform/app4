import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import Retailer		from './retailer';
import Separator	from './separator';

const styles = StyleSheet.create({
	container: {
	},
	banner: {
		padding: 20, paddingTop: 50,
		backgroundColor: '#000',
	},
	title: {
		marginBottom: 20,
		color: '#fff',
		fontSize: 24, fontWeight: 'bold',
		textTransform: 'uppercase',
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

export default withNavigation(({navigation,data}) => (
	<ScrollView style={styles.container}>
		<ImageBackground style={styles.banner} imageStyle={{opacity:0.7}} source={{uri:data.image_url}}>
			<Text style={styles.title}>{data.title}</Text>
			{/*data ? (<Text style={styles.ending}>Заканчивается через {Math.ceil((data.end.getTime()-new Date().getTime())/(24*60*60*1000))} дней</Text>) : null*/}
		</ImageBackground>
		{data.description?.length ? (
			<View style={styles.area}>
				<Text style={styles.subtitle}>Условия акции</Text>
				<Text style={styles.description}>{data.description}</Text>
			</View>
		) : null}
		<View style={styles.retailers}>
			<Text style={[styles.subtitle,{paddingHorizontal:20}]}>Где проводится</Text>
			<FlatList
				data={data.retailer}
				renderItem={({item}) => (<Retailer data={item} />)}
				ItemSeparatorComponent={Separator}
				keyExtractor={item => ''+item.id}
			/>
		</View>
	</ScrollView>
));
