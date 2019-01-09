import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Input		from './input';
import SelectCity	from './select_city';
import InputPhone	from './input_phone';

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
	point_info:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 15, marginTop: 5,
	},
	point_block:{
		flexDirection: 'row',
		alignItems: 'center',
	},
	point_number:{
		fontWeight: 'bold',
		marginRight: 5,
		fontSize: 16,
	},
	point_balance: {
		fontWeight: 'bold',
		marginLeft: 5,
		fontSize: 16,
		color: 'red',
	},
	point_text:{
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
	status_text_red:{
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

export default withNavigation(({navigation,data}) => (
	<View style={styles.container}>
		<Image
			style={styles.image}
			source={{uri: ''}}
		/>
		<View style={styles.area}>
			<Text style={styles.title}>Название приза, может быть длинным</Text>
			{ true || (<View style={styles.point_info}>
				<View style={styles.point_block}>
					<Text style={styles.point_number}>20</Text>
					<Text style={styles.point_text}>баллов</Text>
				</View>
				<View style={styles.point_block}>
					<Text style={styles.point_text}>Осталось:</Text>
					<Text style={styles.point_balance}>12 шт.</Text>
				</View>
			</View>)}
			{ false || (<Text style={styles.check_info}>За чеки:  11111, 222222, 333333</Text>)}
			{ false || (<Text style={styles.status_text_grey}>Продолжайте копить баллы</Text>)}
			{ true || (<Text style={styles.status_text_red}>Отправлено. Смотреть статус</Text>)}
			{ true || (<TouchableOpacity style={styles.button}>
				<Text style={styles.button_text}>Выбрать</Text>
			</TouchableOpacity>)
			}
		</View>
	</View>
));