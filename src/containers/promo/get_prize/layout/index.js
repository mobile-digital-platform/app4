import React,{Component} from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Input		from '../../../../templates/input';
import SelectAdress	from '../../../../templates/select_adress';
import MainText		from '../../../../templates/main_text';
import SubTitle		from '../../../../templates/subtitle';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingVertical: 20, paddingHorizontal: 20,
	},
	area: {
		paddingBottom: 30
	},
	text: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
		textAlign: 'center',
		marginBottom: 15,
	},
	title: {
		paddingBottom: 25, paddingHorizontal: 20,
	},
	save: {
		marginTop: 25, marginBottom: 10,
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

		this.state = {
			name: '',
			family: '',
			father: '',
			mail: '',
			prize_center: '',
		};
	}
	update = (data) =>{
		
	}

	render() {
		let state = this.state;
		return (
				<ScrollView style={styles.container}>
					<View style={styles.area}>
						<Text style={styles.text}>Заполните форму для получения выигрыша почтой.</Text>
						<Input
							title="Имя"
							value={state.name}
							update={value => this.update({ name: value })}
							error={state.name_error}
						/>
						<Input
							title="Отчество"
							value={state.name}
							update={value => this.update({ name: value })}
							error={state.name_error}
						/>
						<Input
							title="Фамилия"
							value={state.name}
							update={value => this.update({ name: value })}
							error={state.name_error}
						/>
						<SubTitle text="Укажите адресс доставки" />
						<SelectAdress
						/>
						<TouchableOpacity style={styles.save} onPress={this.send}>
							<Text style={styles.save_text}>Отправить</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
		)
	}
}
