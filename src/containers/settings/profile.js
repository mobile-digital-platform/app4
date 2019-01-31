import React from 'react';
import {Image,TouchableOpacity,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import User from '../../../assets/ui/user.png';

import SubTitle from '../../templates/subtitle';

import config from '../../config';

const styles = EStyleSheet.create({
	container: {
		paddingVertical: 20, paddingHorizontal: 30,
	},
	list_item: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingVertical: 10,
		// backgroundColor: '#eee',
	},
	list_image: {
		height: 14, width: 13,
	},
	list_text: {
		marginLeft: 10,
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
});

export default withNavigation(({navigation,...props}) => (
	<View style={styles.container}>
		<SubTitle style={{paddingVertical:10}} text="Учетная запись" />
		<View style={styles.list}>
			<TouchableOpacity style={styles.list_item} onPress={_=>navigation.push('settings_authorization')}>
				<Image style={styles.list_image} source={User} />
				<Text style={styles.list_text}>{props.user.id ? 'Сменить пользователя' : 'Войти в профиль'}</Text>
			</TouchableOpacity>
			{/*
			<TouchableOpacity style={styles.list_item} onPress={_=>props.log_out()}>
				<Image style={styles.list_image} source={User} />
				<Text style={styles.list_text}>Выйти</Text>
			</TouchableOpacity>
			{/*
			<TouchableOpacity style={styles.list_item} onPress={_=>navigation.push('settings_change_password')}>
				<Icon name="unlock" style={{color:EStyleSheet.value("$red")}} size={14} />
				<Text style={styles.list_text}>Изменить пароль</Text>
			</TouchableOpacity>
			*/}
		</View>
	</View>
));
