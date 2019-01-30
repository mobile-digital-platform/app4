import React,{Component} from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f1f1f1',
		flexDirection: 'row',
		padding: 20,
		marginBottom: 30,
	},
	image: {
		borderRadius: 50,
		borderWidth: 1, borderColor: '#bbb',
		width: 80, height: 80,
		backgroundColor: '#fff',
	},
	area: {
		marginLeft: 20,
		flex: 1
	},
	title:{
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#3D3D3D',
	},
	prize_info:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15, marginTop: 5,
	},
	block:{
		flexDirection: 'row',
		alignItems: 'center',
	},
	prize_text:{
		flexDirection: 'row',
		fontSize: 16,
	},
	score_number:{
		fontWeight: 'bold',
		marginRight: 5,
		fontSize: 16,
	},
	prize_quantity: {
		fontWeight: 'bold',
		marginLeft: 5,
		fontSize: 16,
		color: 'red',
	},
	status_text:{
		flexDirection: 'row',
		fontSize: 16,
		color: '#bbb',
		marginVertical: 10,
	},
	button: {
		padding: 7,
		borderRadius: 50,
		backgroundColor: 'red',
		width: '50%',
	},
	button_text: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center',
	},
});

export const AvailablePrize = (props) => {
	let prize = props.prize;
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={{ uri: prize.img }}
			/>
			<View style={styles.area}>
				<Text style={styles.title}>{prize.title}</Text>
				<View style={styles.prize_info}>
					<View style={styles.block}>
						<Text style={styles.score_num}>{prize.score_number}</Text>
						<Text style={styles.prize_text}>баллов</Text>
					</View>
					<View style={styles.block}>
						<Text style={styles.prize_text}>Осталось:</Text>
						<Text style={styles.prize_quantity}>{prize.quantity}</Text>
					</View>
				</View>
				{prize.quantity ? (
					<TouchableOpacity style={styles.button} onPress={this.props.choosePrize(prize)}>
						<Text style={styles.button_text}>Выбрать</Text>
					</TouchableOpacity>
				) : (
					<Text style={styles.status_text}>Продолжайте копить баллы</Text>
				)}
			</View>
		</View>
	)
};


/* const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f1f1f1',
		flexDirection: 'row',
		padding: 20,
		marginBottom: 30,
	},
	image: {
		borderRadius: 50,
		borderWidth: 1, borderColor: '#bbb',
		width: 80, height: 80,
		backgroundColor: '#fff',
	},
	area: {
		marginLeft: 20,
		flex: 1
	},
	title:{
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#3D3D3D',
	},
	prize_info:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15, marginTop: 5,
	},
	score_block:{
		flexDirection: 'row',
		alignItems: 'center',
	},
	score_number:{
		fontWeight: 'bold',
		marginRight: 5,
		fontSize: 16,
	},
	score_balance: {
		fontWeight: 'bold',
		marginLeft: 5,
		fontSize: 16,
		color: 'red',
	},
	score_text:{
		flexDirection: 'row',
		fontSize: 16,
	},
	check_info:{
		flexDirection: 'row',
		fontSize: 17,
		marginBottom: 20,
	},
	status_text_grey:{
		flexDirection: 'row',
		fontSize: 16,
		color: '#bbb',
		marginVertical: 10,
	},
	status_text_grey_red:{
		flexDirection: 'row',
		fontSize: 16,
		color: 'red',
		marginVertical: 10,
	},
	button: {
		padding: 7,
		borderRadius: 50,
		backgroundColor: 'red',
		width: '50%',
	},
	button_text: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center',
	},
});


export const MyPrize = (props) => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={{ uri: '' }}
			/>
			<View style={styles.area}>
				<Text style={styles.title}>888</Text>
				{false || (<Text style={styles.check_info}>За чеки:  11111, 222222, 333333</Text>)}
				{false || (<Text style={styles.status_text_grey}>Продолжайте копить баллы</Text>)}
				{true || (<Text style={styles.status_text_grey_red}>Отправлено. Смотреть статус</Text>)}
				{true || (<TouchableOpacity style={styles.button}>
					<Text style={styles.button_text}>Внести данные</Text>
				</TouchableOpacity>)
				}
			</View>
		</View>
	)
};


const empty_styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
	},
	text: {
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
});

export const Empty = (props) => (
	<View style={empty_styles.container}>
		<Text style={empty_styles.text}>{props.text}</Text>
	</View>
); */