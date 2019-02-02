import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Input		from '../../../../templates/input';
import Date			from '../../../../templates/date';
import TextArea		from '../../../../templates/textarea';
import SeriaNumber	from '../../../../templates/seria_number';
import Scan			from '../../../../templates/scan';
import MainText		from '../../../../templates/main_text';
import SubTitle		from '../../../../templates/subtitle';

const styles = StyleSheet.create({
	container: {
	},
	title: {
		paddingTop: 25, paddingBottom: 10,
		paddingHorizontal: 20,
	},
	block: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	scan_text: {
		color: '#3D3D3D',
		fontSize: 18, fontFamily: 'GothamPro',
		lineHeight: 22,	
		flex: 1,
		marginLeft: 20
	},
	button: {
		padding: 15, marginTop: 20,
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
	<View>
		<SubTitle style={styles.title} text="Загрузите фотографии или сканы" />
		<View style={styles.block}>
			<Scan selected={true} />
			<Text style={styles.scan_text}>Паспорт, разворот с фотографии</Text>
		</View>
		<View style={styles.block}>
			<Scan />
			<Text style={styles.scan_text}>Паспорт, разворот с "пропиской"</Text>
		</View>
		<View style={styles.block}>
			<Scan />
			<Text style={styles.scan_text}>ИНН</Text>
		</View>
		<TouchableOpacity style={styles.button} onPress={this.send}>
			<Text style={styles.button_text}>Отправить</Text>
		</TouchableOpacity>
	</View>
));
