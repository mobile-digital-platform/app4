import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Input			from '../../../../templates/input';
import TextArea			from '../../../../templates/textarea';
import SelectCity	from '../../../../templates/select_city';

const styles = StyleSheet.create({
	container: {
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
	}
});

export default withNavigation(({navigation,data}) => (
	<View style={styles.container}>
		<SelectCity />
		<TextArea style={styles.textarea} title="Текст вопроса"/>
		<Input title="E-mail" />
		<TouchableOpacity style={styles.button}>
			<Text style={styles.button_text}>Отправить</Text>
		</TouchableOpacity>
	</View>
));
