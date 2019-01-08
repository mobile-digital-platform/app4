import React from 'react';
import {StyleSheet,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import promo_date_diff from '../../../../services/promo_date_diff';

import Wait			from '../../../../templates/wait';

import Check		from './check';
import Separator	from './separator';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	banner: {
		padding: 20, paddingTop: 0,
		backgroundColor: '#000',
	},
	points_area: {
		alignItems: 'flex-end',
	},
	points: {
		padding: 10,
		backgroundColor: '#b30000',
	},
	points_number: {
		color: '#fff',
		fontSize: 18, fontWeight: 'bold',
	},
	points_type: {
		color: '#fff',
		fontSize: 9,
	},
	title: {
		marginBottom: 10,
		color: '#fff',
		fontSize: 24, fontWeight: 'bold',
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

	list: {
		paddingHorizontal: 20,
	},

	empty: {
		alignItems: 'center',
		padding: 20,
		// backgroundColor: '#eee',
	},
	empty_text: {
		paddingBottom: '20%',
		color: '#555',
		fontSize: 16,
		textAlign: 'center',
	},

	bottom: {
		alignItems: 'center',
		paddingVertical: 15, paddingHorizontal: 40,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},
	add_button: {
		alignItems: 'center',
		width: '100%',
		marginVertical: 5,
		paddingVertical: 15, paddingHorizontal: 50,
		borderRadius: 100,
		backgroundColor: '#f40000',
	},
	add_button_text: {
		color: '#fff',
		fontSize: 16, fontWeight: 'bold',
	},
	get_button: {
		alignItems: 'center',
		width: '100%',
		marginVertical: 5,
		paddingVertical: 15, paddingHorizontal: 50,
		borderWidth: 1, borderColor: '#f40000', borderRadius: 100,
		backgroundColor: '#fff',
	},
	get_button_text: {
		color: '#f40000',
		fontSize: 16,
	},
});

export default withNavigation((props) => {
	let {navigation,data,details,check} = props;

	data = promo_date_diff(data);

	return (
		<View style={styles.container}>
<<<<<<< HEAD
			<ImageBackground style={styles.banner} imageStyle={{opacity:0.7}} source={{uri:data.image_url}}>
				{details.points ? (
				<View style={styles.points_area}>
					<View style={styles.points}>
						<Text style={styles.points_number}>{details.points}</Text>
						<Text style={styles.points_type}>{details.points_type}</Text>
					</View>
				</View>
				) : null}
				<Text style={styles.title}>{data.title.toUpperCase()}</Text>
				<Text style={styles.ending}>{data.diff_text}</Text>
			</ImageBackground>
			<View style={styles.retailer_area}>
				<Image style={styles.retailer_image} source={{uri:data.retailer.image_url}} />
			</View>
			<ScrollView>
			{props.check_error ? (
				<View style={styles.empty}><Text style={styles.empty_text}>{check_error}</Text></View>
			) : (
				props.waiting ? (
					<Wait/>
				) : (
					<FlatList
						style={styles.list}
						data={check}
						renderItem={({item}) => (<Check data={item} />)}
						// ItemSeparatorComponent={Separator}
						keyExtractor={item => ''+item.id}
					/>
				)
			)}
=======
			<ScrollView>
				<ImageBackground style={styles.banner} imageStyle={{opacity:0.7}} source={{uri:data.image_url}}>
					{details.points ? (
					<View style={styles.points_area}>
						<View style={styles.points}>
							<Text style={styles.points_number}>{details.points}</Text>
							<Text style={styles.points_type}>{details.points_type}</Text>
						</View>
					</View>
					) : null}
					<Text style={styles.title}>{data.title.toUpperCase()}</Text>
					<Text style={styles.ending}>{data.diff_text}</Text>
				</ImageBackground>
				<View style={styles.retailer_area}>
					<Image style={styles.retailer_image} source={{uri:data.retailer.image_url}} />
				</View>
				{props.check_error ? (
					<View style={styles.empty}><Text style={styles.empty_text}>{check_error}</Text></View>
				) : (
					props.waiting ? (
						<Wait/>
					) : (
						<FlatList
							style={styles.list}
							data={check}
							renderItem={({item}) => (<Check data={item} />)}
							// ItemSeparatorComponent={Separator}
							keyExtractor={item => ''+item.id}
						/>
					)
				)}
>>>>>>> 90cb72bff6426a5f10893161faf26c9b1b2dc4da
			</ScrollView>
			<View style={styles.bottom}>
				{details.add_check ? (
					<TouchableOpacity style={styles.add_button}><Text style={styles.add_button_text}>Добавить чек</Text></TouchableOpacity>
				) : null}
				{details.buy_prize ? (
					<TouchableOpacity style={styles.get_button}><Text style={styles.get_button_text}>Получить выигрыш</Text></TouchableOpacity>
				) : null}
			</View>
		</View>
	);
});
