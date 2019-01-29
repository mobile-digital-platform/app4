import React, {Component} from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import ModalFilterPicker from 'react-native-modal-filter-picker';

import Input		from '../../../../templates/input';
import SelectCity	from '../../../../templates/select_city';
import MainText		from '../../../../templates/main_text';
import Datetime		from '../../../../templates/date_time';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 25,
		backgroundColor: '#fff',
	},
	area: {
		paddingHorizontal: 20,
	},
	main_text: {
		paddingBottom: 20,
	},
	block: {
		paddingBottom: 20,
	},
	map: {
		height: 250,
		marginVertical: 5,
		backgroundColor: '#bbb',
	},
	save: {
		marginHorizontal: 20, marginVertical: 20,
		padding: 15,
		borderRadius: 100,
		backgroundColor: '#f1f1f1',
	},
	save_text: {
		color: '#d5d5d5',
		fontSize: 20,
		textAlign: 'center',
	}
});

export default class GetPrize extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let state = this.state;

		return (
			<ScrollView style={styles.container}>
				<View style={styles.area}>
					<MainText style={styles.main_text} text="Заполните форму для получения выигрыша в Центре выдачи призов." />
					<View style={styles.block}>
						<Input title="Имя" />
						<Input title="Отчество" />
						<Input title="Фамилия" />
					</View>
					<Datetime />
					<View style={styles.block}>
						<Input title="E-mail" />
						<SelectCity />
					</View>
				</View>
				<TouchableOpacity style={styles.map} onPress={this.send}>
					{/* map */}
				</TouchableOpacity>
				<TouchableOpacity style={styles.save} onPress={this.send}>
					<Text style={styles.save_text}>Отправить</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}
