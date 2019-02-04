import React,{Component} from 'react';
import {FlatList,Image,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import f from '../functions';

import MainText from './main_text';

const styles = EStyleSheet.create({
	prize_container: {
		backgroundColor: '#f1f1f1',
		flexDirection: 'row',
		paddingVertical: 20, paddingHorizontal: 15,
		marginBottom: 30,
	},
	image: {
		height: 80, width: 80,
		borderWidth: 1, borderColor: '#bbb',
		borderRadius: 50,
		backgroundColor: '#fff',
	},
	area: {
		marginLeft: 20,
		flex: 1
	},
	title: {
		marginBottom: 10,
		color: '#3D3D3D',
		fontSize: 20, fontFamily: 'GothamPro-Bold',
	},
	prize_info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15, marginTop: 5,
	},
	block: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	prize_text: {
		fontSize: 16,
	},
	prize_quantity: {
		marginLeft: 5,
		color: '$red',
		fontSize: 16, fontFamily: 'GothamPro-Bold',
	},
	score_num: {
		marginRight: 5,
		color: '#000',
		fontSize: 16,fontFamily: 'GothamPro-Bold',
	},
	status_grey: {
		marginVertical: 5,
		fontSize: 16,
		color: '#bbb',
	},
	button: {
		width: '50%',
		padding: 10,
		borderRadius: 50,
		backgroundColor: '$red',
	},
	button_text: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center',
	},

	/* дополнительные стили для страницы "Мои призы" */
	container: {
		marginBottom: 20,
	},
	enter_container: {
		paddingHorizontal: 15,
		paddingBottom: 25,
	},
	main_text: {
		marginBottom: 15,
		textAlign: 'left',
	},
	comment: {
		marginBottom: 20,
		fontSize: 17,
	},
	status_red: {
		marginVertical: 5,
		color: '$red',
		fontSize: 16,
	},
});

export const AvailablePrize = (props) => {
	let data = props.data;
	return (
		<View style={styles.prize_container}>
			<Image
				style={styles.image}
				source={{uri: data.img}}
			/>
			<View style={styles.area}>
				<Text style={styles.title}>{data.title}</Text>
				<View style={styles.prize_info}>
					<View style={styles.block}>
						<Text style={styles.score_num}>{data.score_num}</Text>
						<Text style={styles.prize_text}>{'балл'+f.number_case(data.score_num,1)}</Text>
					</View>
					<View style={styles.block}>
						<Text style={styles.prize_text}>Осталось:</Text>
						<Text style={styles.prize_quantity}>{data.quantity} шт.</Text>
					</View>
				</View>
				{!data.quantity ? (
					<Text style={styles.status_grey}>Увы, этот товар закончился</Text>
				) : (data.score_num < props.balance ? (
						<TouchableOpacity style={styles.button} onPress={_ => props.choosePrize(data)}>
							<Text style={styles.button_text}>Выбрать</Text>
						</TouchableOpacity>
					) : (
						<Text style={styles.status_grey}>Продолжайте копить балллы</Text>
					)
				)}
			</View>
		</View>
	)
};


export const MyPrize = (props) => {
	let data = props.data;
	return (
		<View style={styles.container}>
			<View style={styles.enter_container}>
				<MainText style={styles.main_text} text="Чтобы мы могли отправить призы, необходимо внести данные" />
				<TouchableOpacity style={styles.button}>
					<Text style={styles.button_text}>Ввести данные</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.prize_container}>
				<Image
					style={styles.image}
					source={{ uri: 'data.img' }}
				/>
				<View style={styles.area}>
					<Text style={styles.title}>888</Text>
					{false || (<Text style={styles.comment}>{'data.comment'}</Text>)}
					{false || (<Text style={styles.status_text_grey}>{'data.comment'}</Text>)}
					{true || (<Text style={styles.status_text_grey_red}>{'data.status'}</Text>)}
					{true || (<TouchableOpacity style={styles.button}>
						<Text style={styles.button_text}>Внести данные</Text>
					</TouchableOpacity>)
					}
				</View>
			</View>
		</View>
	)
};
