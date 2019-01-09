import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import Scan			from '../../../../templates/scan';
import Input		from '../../../../templates/input';
import DateTime		from '../../../../templates/date_time';
import MainText		from '../../../../templates/main_text';
import SubTitle		from '../../../../templates/subtitle';

const styles = StyleSheet.create({
	container: {
	},
	check_photo: {
		paddingVertical: 20, paddingHorizontal: 0,
		backgroundColor: '#fff',
	},
	photo_text: {
		paddingBottom: 10, paddingHorizontal: 20,
	},
	photo_container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	check_data: {
		borderTopWidth: 1, borderTopColor: '#ddd',
		paddingVertical: 20, paddingHorizontal: 20,
	},
	data_title: {
		paddingHorizontal: 20, paddingVertical: 0,
	},
	scan: {
		padding: 15, 
		marginHorizontal: 20, marginVertical: 20,
		borderRadius: 100,
		backgroundColor: 'red',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	scan_text: {
		color: '#fff',
		fontSize: 20,
		marginLeft: 10,
	},
	save: {
		marginVertical: 15, padding: 15,
		borderRadius: 100,
		backgroundColor: '#f1f1f1',
	},
	save_text: {
		color: '#d5d5d5',
		fontSize: 20,
		textAlign: 'center',
	}

});

export default withNavigation(({navigation,data}) => (
	<ScrollView style={styles.container}>
			<View style={styles.check_photo}>
				<MainText style={styles.photo_text} text="Сфотографируйте чек так, чтобы были видны название магазина, список товаров, сумма, дата, фискальные данные (ФН, ФД, ФП), и QR-код." />
				<View style={styles.photo_container}>
					<Scan selected={true} />
					<Scan selected={false} />
				</View>
			</View>
			<View style={styles.check_data}>
				<SubTitle style={styles.data_title} text="Фискальные данные чека" />
				<TouchableOpacity style={styles.scan} onPress={this.send}>
					<Icon name="qrcode" style={{color: 'white'}} size={25} />
					<Text style={styles.scan_text}>Сканировать QR-код</Text>
				</TouchableOpacity>
				<DateTime />
				<Input title="Сумма" />
				<Input title="ФН" />
				<Input title="ФД" />
				<Input title="ФП" />
				<TouchableOpacity style={styles.save} onPress={this.send}>
					<Text style={styles.save_text}>Сохранить чек</Text>
				</TouchableOpacity>
			</View>
	</ScrollView>
));
