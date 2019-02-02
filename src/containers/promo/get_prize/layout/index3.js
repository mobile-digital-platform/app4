import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Input		from '../../../../templates/input';
import Date	from '../../../../templates/date';
import TextArea	from '../../../../templates/textarea';
import MainText		from '../../../../templates/main_text';
import SubTitle		from '../../../../templates/subtitle';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 25, paddingHorizontal: 20,
		backgroundColor: '#fff',
	},
	title: {
		marginBottom: 25,
		paddingHorizontal: 20,
	},
	main_text: {
		marginBottom: 25,	
	},
	block: {
		marginBottom: 30,
	},
	textarea_container: {
		marginBottom: 25,
	},
	save: {
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

export default withNavigation(({navigation,data}) => (
	<ScrollView style={styles.container}>
		<MainText style={styles.main_text} text="Заполните форму для получения выигрыша." />
		<View style={styles.block}>
			<Input title="Имя" />
			<Input title="Отчество" />
			<Input title="Фамилия" />
		</View>
		<View style={styles.block}>
			<Input title="E-mail" />
			<Date title="Дата рождения" />
		</View>
		<SubTitle style={styles.title} text="Адрес регистрации" />
		<View style={styles.textarea_container}><TextArea /></View>
		<MainText style={styles.main_text} text="Текст, описывающий особенности получения выигрыша, правила и какие-то хитрости. Может занимать несколько строчек." />
		<TouchableOpacity style={styles.save} onPress={this.send}>
			<Text style={styles.save_text}>Отправить</Text>
		</TouchableOpacity>
	</ScrollView>
));
