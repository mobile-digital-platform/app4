import React from 'react';
import {Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Subtitle from '../../../../templates/subtitle';

import Item from './item';

const styles = EStyleSheet.create({
	container: {
		marginTop: 25, marginBottom: 15,
		backgroundColor: '#fff',
	},
	info: {
		marginHorizontal: 10,
	},
	text: {
		marginVertical: 10,
		color: '#3d3d3d',
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 14,
	},
	button: {
		justifyContent: 'center',
		height: 30, width: 130,
		borderRadius: 40,
		backgroundColor: '$red',
	},
	button_text: {
		color: '#fff',
		fontSize: 12, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
		lineHeight: 16,
	},
});

export default withNavigation(({data,navigation}) => (
	<View style={styles.container}>
		<View style={styles.info}>
			<Subtitle text={data.group_name} />
			<Text style={styles.text}>Чтобы мы могли отправить {data.group_name}, необходимо внести данные.</Text>
			<TouchableOpacity style={styles.button} onPress={_=>navigation.push('promo_get_prize')}>
				<Text style={styles.button_text}>Внести данные</Text>
			</TouchableOpacity>
		</View>
		{data.prize_list.map((e,i) => (<Item key={i} {...e} link="http://coca-cola.com" />))}
	</View>
));
