import React from 'react';
import {Platform,TouchableOpacity,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome5';

import SubTitle from '../../templates/subtitle';

import config from '../../config';

const styles = EStyleSheet.create({
	container: {
		paddingVertical: 20, paddingHorizontal: 30,
	},
	list_item: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		// backgroundColor: '#eee',
	},
	list_text: {
		marginLeft: 10, paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
});

export default withNavigation(({navigation,...props}) => (
	<View style={styles.container}>
		<SubTitle style={{paddingVertical:10}} text="Учетная запись" />
		<View style={styles.list}>
			<TouchableOpacity style={styles.list_item} onPress={_=>navigation.push('settings_authorization')}>
				<Icon name="user-alt" style={{color:EStyleSheet.value("$red")}} size={14} />
				<Text style={styles.list_text}>{props.user.id ? 'Сменить пользователя' : 'Войти в профиль'}</Text>
			</TouchableOpacity>
			{/*
			<TouchableOpacity style={styles.list_item} onPress={_=>props.log_out()}>
				<Icon name="user-alt" style={{color:EStyleSheet.value("$red")}} size={14} />
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
