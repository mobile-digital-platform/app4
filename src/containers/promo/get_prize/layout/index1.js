import React, {Component} from 'react';
import {ImageBackground,FlatList,ScrollView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Input	from '../../../../templates/input';
import SelectAdress	from '../../../../templates/select_adress';

const styles = EStyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	area: {
		paddingHorizontal: 20,
		paddingTop: 20, paddingBottom: 25,
	},
	text: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
		textAlign: 'center',
	},
	textarea: {
		marginVertical: 5, paddingHorizontal: 25,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 20,
		backgroundColor: '#fff',
	},
	textarea_text:{
		color: '#bbb',
		height: 50, width: '100%',
		marginTop: 15, marginBottom: 15,
		fontSize: 18, fontFamily: 'GothamPro', lineHeight: 18,
		textAlignVertical: 'top', justifyContent: 'flex-start',
	},
	block: {
		paddingTop: 10,
	},
	map: {
		height: 250,
		backgroundColor: '#bbb',
	},
	save: {
		marginHorizontal: 20,
		marginTop: 20, marginBottom: 30,
		padding: 15,
		borderRadius: 100,
		backgroundColor: '#f1f1f1',
	},
	save_text: {
		color: '#d5d5d5',
		fontSize: 16,
		fontFamily: 'GothamPro',
		textAlign: 'center',
	}
});

export default class GetPrize extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			father: '',
			family: '',
			mail: '',
			adress: '',
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
					<Text style={styles.text}>Заполните форму для получения выигрыша в Центре выдачи призов.</Text>
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
						<SelectAdress
							title="Выберите центр выдачи"
							value=""
							send={value => this.setState({ adress: value })}
							error={state.city_error}
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
