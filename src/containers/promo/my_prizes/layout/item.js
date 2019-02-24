import React from 'react';
import {Linking,Image,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginTop: 20, padding: 10,
		backgroundColor: '#f4f4f4',
	},
	image_area: {
		height: 50, width: 50,
		borderRadius: 25,
		backgroundColor: '#fff',
	},
	image: {
		height: 50, width: 50,
		borderRadius: 25,
	},
	area: {
		flex: 1,
		marginLeft: 10,
	},
	title: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro-Bold',
		lineHeight: 18,
	},
	checks: {
		marginTop: 5,
		color: '#3d3d3d',
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
	state: {
		marginVertical: 10,
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 14,
	},
	grey_state: {
		color: '#b3b3b3',
	},
	red_state: {
		color: '$red',
	},
});

translate_state = (state) => ({
	'Нужно ввести данные': {
		id: 0,
		style: styles.grey_state,
	},
	'Ожидает отправки': {
		id: 1,
		style: styles.grey_state,
	},
	'Отправлен на указанный адрес': {
		id: 2,
		style: styles.grey_state,
	},
	'Отправлено. Смотреть статус': {
		id: 3,
		style: styles.red_state,
	},
	'Получить подарок': {
		id: 4,
		style: styles.red_state,
	},
}[state]);

export default withNavigation((props) => {
	let state = {
		text: props.state,
		...translate_state(props.state),
	};
	state.id = 4;
	console.log(props);

	return (
		<View style={styles.container}>
			<View style={styles.image_area}>
				{props.image_url ? (<Image style={styles.image} source={{uri:props.image_url}} />) : null}
			</View>
			<View style={styles.area}>
				<Text style={styles.title}>{props.name}</Text>
				{props.details?.length ? (<Text style={styles.checks}>{props.details}</Text>) : null}
				{props.link?.length ? (
					<TouchableOpacity onPress={_=>Linking.openURL(props.link)}>
						<Text style={[styles.state,styles.red_state]}>{state.text}</Text>
					</TouchableOpacity>
				) : (state.id == 4) ? (
					<TouchableOpacity onPress={_=>{
						props.navigation.push('promo_get_prize',{promo_id:props.promo_id,get_type:props.get_type});
					}}>
						<Text style={[styles.state,styles.red_state]}>{state.text}</Text>
					</TouchableOpacity>
				) : (
					<Text style={[styles.state,translate_state(props.state)?.style]}>{state.text}</Text>
				)}
			</View>
		</View>
	);
});
