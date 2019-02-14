import React,{Component} from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import Input		from '../../../../templates/input';
import SelectAdress	from '../../../../templates/select_adress';
import SubTitle		from '../../../../templates/subtitle';

const styles = EStyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingTop: 20, paddingHorizontal: 20,
	},
	fio_area: {
		paddingBottom: 20
	},
	text: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
		textAlign: 'center',
		marginBottom: 15,
	},
	title: {
		paddingHorizontal: 20,
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


export default withNavigation(class GetPrize extends Component {
	constructor(props) {
		super(props);
		props = props.user;

		this.state = {
			waiting: false,
			name: 	props.name ??  '',
			father: props.father ?? '',
			family: props.family ?? '',
			adress: props.adress?.full ?? '',
		};
	}

	componentDidUpdate(prev_props) {
		// Изменились данные о пользователе
		if(!Object.is(prev_props.user,this.props.user)) {
			let props = this.props.user;
			this.setState({
				name: 	props.name ??  '',
				father: props.father ?? '',
				family: props.family ?? '',
				adress: props.adress?.full ?? '',
				name_error: false,
				father_error: false,
				family_error: false,
				adress_error: false,
			});
		}
	}

	update = async (data) =>{
		await this.setState(data);
		let state = this.state;
		this.props.set_data({
			name:			state.name,
			father:			state.father,
			family:			state.family,
			adress:			state.adress,
		});

		// убор ошибок
		let fields = ['name','father','family','adress'];
		fields.forEach(field =>{
			if(state[field].length && state[field+'_error']){
				this.setState({[field+'_error']:false});
			}
		})
	}

	send = async () =>{
		let state = this.state;

		Keyboard.dismiss();
		if(state.waiting) return;

		// Проверяем имя
		if(!state.name.length) {
			this.setState({name_error:'Введите имя'});
			return;
		} else {
			await this.setState({name_error:false});
		}
		// Проверяем отчество
		if(!state.father.length) {
			this.setState({father_error:'Введите отчество'});
			return;
		} else {
			await this.setState({father_error:false});
		}
		// Проверяем фамилию
		if(!state.family.length) {
			this.setState({family_error:'Введите фамилию'});
			return;
		} else {
			await this.setState({family_error:false});
		}
		// проверяем адрес доставки
		if(!state.adress.length) {
			this.setState({adress_error:'Введите адрес доставки'});
			return;
		} else {
			await this.setState({adress_error:false});
		}
		//navigation.push('promo_change_adress');
	}

	render() {
		console.log('get_prize this',this);
		let {state,props} = this;
		return (
				<ScrollView style={styles.container}>
					<View style={styles.fio_area}>
						<Text style={styles.text}>Заполните форму для получения выигрыша почтой.</Text>
						<Input
							title="Имя"
							value={state.name}
							update={value => this.update({name:value})}
							editable={!!props.name}
						/>
						<Input
							title="Отчество"
							value={state.father}
							update={value => this.update({father:value})}
							editable={!!props.father}
						/>
						<Input
							title="Фамилия"
							value={state.family}
							update={value => this.update({family:value})}
							editable={!!props.family}
						/>
					</View>
					<View style={styles.adress_area}>
						<SubTitle style={styles.title} text="Адрес доставки" />
						<SelectAdress
							title="Укажите адрес доставки"
							value={state.adress}
							error={state.adress_error}
						/>
					</View>
					<TouchableOpacity style={styles.save} onPress={this.send}>
						<Text style={styles.save_text}>Отправить</Text>
					</TouchableOpacity>
				</ScrollView>
		)
	}
})