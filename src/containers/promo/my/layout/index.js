import React from 'react';
import {StyleSheet,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import promo_date_diff from '../../../../services/promo_date_diff';

import Wait			from '../../../../templates/wait';

import Check		from './check';
import Separator	from './separator';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		height: 120,
		padding: 20, paddingTop: 0,
		backgroundColor: '#000',
	},
	points_area: {
		alignItems: 'flex-end',
		marginRight: -10,
	},
	points: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 45, width: 50,
		backgroundColor: '#b30000',
	},
	points_number: {
		paddingBottom: 3,
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro', fontWeight: 'bold',
	},
	points_type: {
		color: '#fff',
		fontSize: 9, fontFamily: 'GothamPro',
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
		marginTop: -30, marginBottom: -10,
		paddingRight: 10,
	},
	retailer_image: {
		height: 40, width: 40,
		borderRadius: 20,
		backgroundColor: '#eee',
	},

	main_area: {
		flex: 1,
		justifyContent: 'center',
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
		fontSize: 14,
		textAlign: 'center',
		lineHeight: 16,
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
		paddingVertical: 10, paddingHorizontal: 50,
		borderRadius: 100,
		backgroundColor: '$red',
	},
	add_button_text: {
		color: '#fff',
		fontSize: 14, fontWeight: 'bold',
	},
	get_button: {
		alignItems: 'center',
		width: '100%',
		marginVertical: 5,
		paddingVertical: 10, paddingHorizontal: 50,
		borderWidth: 1, borderColor: '$red', borderRadius: 100,
		backgroundColor: '#fff',
	},
	get_button_text: {
		color: '$red',
		fontSize: 14,
	},
});

export default withNavigation((props) => {
	let {navigation,data,details,check} = props;

	data = promo_date_diff(data);

	return (
		<View style={styles.container}>
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
			<View style={styles.main_area}>
			{props.check_error ? (
				<View style={styles.empty}><Text style={styles.empty_text}>{check_error}</Text></View>
			) : (
				props.waiting ? (
					<Wait/>
				) : (
					check.length ? (
						<ScrollView><FlatList
							style={styles.list}
							data={check}
							renderItem={({item}) => (<Check data={item} />)}
							// ItemSeparatorComponent={Separator}
							keyExtractor={item => ''+item.id}
						/></ScrollView>
					) : (
						<View style={styles.empty}><Text style={styles.empty_text}>
							Пока у вас нет ни одной покупки по акции.{'\n\n'}
							{data.retailer.has_loyalty_card ? (
								details.add_check ? (
									'Вы можете вручную добавить кассовый чек, нажав кнопку «Добавить»'
								) : (
									'Зарегистрируйте карту лояльности магазина в настройках, и используйте ее при покупке.\n'+
									'Данные по покупкам добавятся автоматически.'
								)
							) : null}
						</Text></View>
					)
				)
			)}
			</View>
			{details.add_check && details.buy_prize ? (
				<View style={styles.bottom}>
					{details.add_check ? (
						<TouchableOpacity style={styles.add_button}><Text style={styles.add_button_text}>Добавить чек</Text></TouchableOpacity>
					) : null}
					{details.buy_prize ? (
						<TouchableOpacity style={styles.get_button}><Text style={styles.get_button_text}>Получить выигрыш</Text></TouchableOpacity>
					) : null}
				</View>
			) : null}
		</View>
	);
});
