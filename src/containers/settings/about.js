import React from 'react';
import {StyleSheet,TouchableOpacity,Text,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import config from '../../config';

const styles = StyleSheet.create({
	container: {
		padding: 10, paddingHorizontal: 30,
	},
	title: {
		paddingVertical: 15, paddingHorizontal: 10,
		color: '#bbb',
		fontSize: 14, fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	list: {
		paddingBottom: 10,
	},
	list_item: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15,
		// backgroundColor: '#eee',
	},
	list_text: {
		flex: 1,
		marginLeft: 5,
		fontSize: 16, fontWeight: 'bold',
	},
	bottom: {
		marginTop: 20, marginBottom: 70,
	},
	version: {
		marginBottom: 15,
		fontSize: 18,
	},
	support: {
		marginVertical: 5,
		fontSize: 18,
	},
	support_number: {
		fontSize: 22, fontWeight: 'bold',
	}
});

export default withNavigation((props) => (
	<View style={styles.container}>
		<Text style={styles.title}>О приложении</Text>
		<View style={styles.list}>
			<TouchableOpacity style={styles.list_item} onPress={
				_=>props.navigation.push('web',{title:'Правила',source:'https://www.coca-cola.ru/terms'})
			}>
				<Icon name="navicon" style={{color:'red'}} size={40} />
				<Text style={styles.list_text}>Правила использования приложения</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.list_item} onPress={
				_=>props.navigation.push('web',{title:'Политика',source:'https://www.coca-cola.ru/privacy'})
			}>
				<Icon name="navicon" style={{color:'red'}} size={40} />
				<Text style={styles.list_text}>Политика конфиденциальности</Text>
			</TouchableOpacity>
		</View>
		<View style={styles.bottom}>
			<Text style={styles.version}>Версия {config.version}, © {config.year}</Text>
			<Text style={styles.support}>Телефон поддержки</Text>
			<Text style={styles.support_number}>{config.support_number}</Text>
		</View>
	</View>
));
