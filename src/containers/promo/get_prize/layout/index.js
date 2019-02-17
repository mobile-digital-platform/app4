import React, {Component} from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Input	from '../../../../templates/input';
import Select	from '../../../../templates/select';
import MainText	from '../../../../templates/main_text';

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

const options = [
	{
		key: 'kenya',
		label: 'Kenya',
	},
	{
		key: 'uganda',
		label: 'Uganda',
	},
	{
		key: 'libya',
		label: 'Libya',
	},
	{
		key: 'morocco',
		label: 'Morocco',
	},
	{
		key: 'estonia',
		label: 'Estonia',
	},
	{
		key: 'kenya',
		label: 'Kenya',
	},
	{
		key: 'uganda',
		label: 'Uganda',
	},
	{
		key: 'libya',
		label: 'Libya',
	},
	{
		key: 'morocco',
		label: 'Morocco',
	},
	{
		key: 'estonia',
		label: 'Estonia',
	},
];

export default class GetPrize extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			family: '',
			father: '',
			mail: '',
			prize_center: '',
		};
	}
	update = (data) =>{
		this.setState(data);
	}

	render() {
		let state = this.state;
		return (
			<ScrollView style={styles.container}>
				<View style={styles.area}>
					<MainText style={styles.main_text} text="Заполните форму для получения выигрыша в Центре выдачи призов." />
					<View style={styles.block}>
						<Input
							title="Имя"
							value={state.name}
							update={value => this.update({ name: value })}
							error={state.name_error}
						/>
						<Input
							title="Отчество"
							value={state.father}
							update={value => this.update({ father: value })}
							error={state.father_error}
						/>
						<Input
							title="Фамилия"
							value={state.family}
							update={value => this.update({ family: value })}
							error={state.family_error}
						/>
					</View>
					<View style={styles.block}>
						<Input
							title="E-mail"
							value={state.mail}
							update={value => this.update({ mail: value })}
							error={state.mail_error}
						/>
						<Select
							title="Выберите центр выдачи"
							data={options}
							value={state.prize_center}
							update={value => this.update({ prize_center: value })}
						/>
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
