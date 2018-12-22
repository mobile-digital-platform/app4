import React from 'react';
import {StyleSheet,TouchableOpacity,Text,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome5';

import SubTitle		from '../../templates/subtitle';

import config from '../../config';

const styles = StyleSheet.create({
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
		marginLeft: 10,
		fontSize: 16, fontWeight: 'bold',
	},
});

export default withNavigation(({navigation,...props}) => (
	<View style={styles.container}>
		<SubTitle style={{paddingVertical:10,paddingHorizontal:10}} text="Учетная запись" />
		<View style={styles.list}>
			<TouchableOpacity style={styles.list_item} onPress={_=>{

				navigation.push('settings_authorization');
			}}>
				<Icon name="user-alt" style={{color:'red'}} size={20} />
				<Text style={styles.list_text}>Сменить пользователя</Text>
			</TouchableOpacity>
			{/*
			<TouchableOpacity style={styles.list_item} onPress={_=>navigation.push('settings_change_password')}>
				<Icon name="unlock" style={{color:'red'}} size={40} />
				<Text style={styles.list_text}>Изменить пароль</Text>
			</TouchableOpacity>
			*/}
		</View>
	</View>
));
