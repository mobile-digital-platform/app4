import React, { Component } from 'react';
import { StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image,Modal,Alert} from 'react-native';
import { withNavigation } from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';
import MainText from '../../../../templates/main_text';
import Input from '../../../../templates/input';
import TextArea from '../../../../templates/textarea';
import SelectCity from '../../../../templates/select_city';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 35, paddingHorizontal: 20,
	},
	textarea: {
		height: 240,
	},
	button: {
		marginTop: 15, padding: 15,
		borderRadius: 100,
		backgroundColor: '#f1f1f1',
	},
	button_text: {
		color: '#d5d5d5',
		fontSize: 20,
		textAlign: 'center',
	},
	modal: {
		backgroundColor: 'rgba(0,0,0,0.7)',
		position: 'absolute',
		left: 0, right: 0, top: 0, bottom: 0,
		alignItems: 'center',
	},
	modal_container: {
		backgroundColor: 'white',
		paddingVertical: 40, paddingHorizontal: 40,
		alignItems: 'center',
		width: '90%',
		top: '15%',
	},
	modal_icon: {
		color: 'red',
		marginBottom: 30,
	},
	modal_text: {
		width: 350,
	},
	modal_text_bold: {
		width: 350,
		fontWeight: 'bold',
		marginBottom: 30,
	},
	modal_button: {
		padding: 14,
		marginTop: 30,
		borderRadius: 50,
		backgroundColor: 'red',
		width: '100%'
	},
	modal_button_text: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center',
	},
});

export default withNavigation(class AddCheck extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		modalVisible: false,
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	render() {

		return (
			<View style={styles.container}>
				<SelectCity />
				<TextArea style={styles.textarea} title="Текст вопроса" />
				<Input title="E-mail" />
				<TouchableOpacity style={styles.button} onPress={() => {this.setModalVisible(true)}}>
					<Text style={styles.button_text}>Отправить</Text>
				</TouchableOpacity>
				<Modal
					animationType="slide"
					transparent={true}
					visible={true}>
					<View style={styles.modal}>
						{true ? (
							<View style={styles.modal_container}>
								<Icon name="check" style={styles.modal_icon} size={70} />
								<MainText style={styles.modal_text} text="Ваше сообщение принято. Ответ будет отправлен по эллектронной почте на адрес:" />
								<MainText style={styles.modal_text_bold} text="marina@ma.ma" />
								<MainText style={styles.modal_text} text="Спасибо!" />
								<TouchableOpacity style={styles.modal_button}  onPress={() => {this.setModalVisible(false)}} >
									<Text style={styles.modal_button_text}>Закрыть</Text>
								</TouchableOpacity>
							</View>
						) : (
								<View style={styles.modal_container}>
									<Icon name="close-o" style={styles.modal_icon} size={70} />
									<MainText style={styles.modal_text} text="Не удалось передать данные. Проверьте, есть ли доступ к Интернет." />
									<TouchableOpacity style={styles.modal_button} onPress={() => {this.setModalVisible(false)}}>
										<Text style={styles.modal_button_text}>Ок</Text>
									</TouchableOpacity>
								</View>
							)}
					</View>
				</Modal>
			</View>
		);
	}
});