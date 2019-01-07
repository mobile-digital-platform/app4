import React from 'react';
import {StyleSheet,TouchableOpacity,Text,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome5';

import SubTitle from '../../templates/subtitle';

import config from '../../config';

const styles = StyleSheet.create({
	container: {
		paddingTop: 30, paddingBottom: 10,
		paddingHorizontal: 30,
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
		marginLeft: 10, paddingTop: 3,
		fontSize: 16, fontFamily: 'GothamPro-Medium',
	},
	bottom: {
		marginTop: 20, marginBottom: 30,
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
		fontSize: 22, fontFamily: 'GothamPro-Medium',
	}
});

export default withNavigation((props) => (
	<View style={styles.container}>
		<SubTitle style={{paddingVertical:15,paddingHorizontal:10}} text="О приложении" />
		<View style={styles.list}>
			<TouchableOpacity style={styles.list_item} onPress={_ => {
				props.navigation.push('web',{title:'Правила',source:'https://www.coca-cola.ru/terms'});
			}}>
				<Icon name="file-alt" style={{color:'red'}} size={20} />
				<Text style={styles.list_text}>Правила использования приложения</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.list_item} onPress={_ => {
				props.navigation.push('web',{title:'Политика',source:'https://www.coca-cola.ru/privacy'});
			}}>
				<Icon name="file-alt" style={{color:'red'}} size={20} />
				<Text style={styles.list_text}>Политика конфиденциальности</Text>
			</TouchableOpacity>
		</View>
		<View style={styles.bottom}>
			<Text style={styles.version}>Версия {config.version}, © {config.year}</Text>
			{/*
			<Text style={styles.support}>Телефон поддержки</Text>
			<Text style={styles.support_number}>{config.support_number}</Text>
			*/}
		</View>
	</View>
));
