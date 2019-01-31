import React from 'react';
import {Linking,Platform,TouchableOpacity,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome5';

import SubTitle from '../../templates/subtitle';

import config from '../../config';

const styles = EStyleSheet.create({
	container: {
		paddingBottom: 10,
		paddingHorizontal: 30,
	},
	text: {
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 14,
	},
	list: {
		paddingVertical: 10,
	},
	list_item: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 5,
		// backgroundColor: '#eee',
	},
	list_text: {
		flex: 1,
		marginLeft: 10,
		fontSize: 14, fontFamily: 'GothamPro-Bold',
		lineHeight: 16,
	},
	bottom: {
		marginTop: 20, marginBottom: 30,
	},
	version: {
		marginBottom: 15,
		fontSize: 14, fontFamily: 'GothamPro',
	},
	support: {
		marginVertical: 5,
		fontSize: 14,
	},
	support_number: {
		fontSize: 21, fontFamily: 'GothamPro-Medium',
	}
});

export default withNavigation((props) => (
	<View style={styles.container}>
		<SubTitle style={{paddingTop:15,paddingBottom:10}} text="О приложении" />
		<Text style={styles.text}>
			Регистрируясь, пользователь соглашается на обработку персональных данных на всех активностях, анонсированных в данном приложении
		</Text>
		<View style={styles.list}>
			<TouchableOpacity style={styles.list_item} onPress={_=>Linking.openURL('http://api.emg.ru/Files/Terms_of_use_CCApp.pdf')}>
				<Icon name="file-alt" style={{color:'red'}} size={20} />
				<Text style={styles.list_text}>Правила использования приложения</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.list_item} onPress={_=>Linking.openURL('http://api.emg.ru/Files/Privacy_Policy_CCApp.pdf')}>
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
