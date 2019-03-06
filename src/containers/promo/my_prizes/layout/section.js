import React from 'react';
import {Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Subtitle from '../../../../templates/subtitle';

import Item from './item';

const styles = EStyleSheet.create({
	container: {
		marginTop: 20,
		paddingHorizontal: 10,
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
		marginBottom: 10,
		borderRadius: 40,
		backgroundColor: '$red',
	},
	button_text: {
		color: '#fff',
		fontSize: 12, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
		lineHeight: 16,
	},
	empty: {
		marginTop: 20, paddingHorizontal: 10,
	},
	empty_text: {
		color: '#3d3d3d',
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
});

export default withNavigation(({promo_id,data,...props}) => (
	<View style={styles.container}>
		<View style={styles.info}>
			<Subtitle text={data.group_name} />
			{data.user_data_type != -1 ? (
			<>
				<Text style={styles.text}>Чтобы мы могли отправить {data.group_name.toLowerCase()}, необходимо внести данные.</Text>
				<TouchableOpacity style={styles.button} onPress={_=>{
					props.navigation.push('promo_address',{promo_id,get_type:data.get_type,user_data_type:data.user_data_type});
					props.navigation.addListener('didFocus',props.reload);
				}}>
					<Text style={styles.button_text}>Внести данные</Text>
				</TouchableOpacity>
			</>
			) : null}
			{/*
			<Text style={styles.text}>
				{data.user_data_type != -1 ? (
					'Чтобы мы могли отправить '+data.group_name.toLowerCase()+', необходимо внести данные.'
				) : (
					'Если необходимо, вы можете изменить регистрационные данные.'
				)}
			</Text>
			<TouchableOpacity style={styles.button} onPress={_=>{
				props.navigation.push('promo_address',{promo_id,get_type:data.get_type,user_data_type:data.user_data_type});
				// props.navigation.push('promo_passport',{promo_id,get_type:data.get_type,user_data_type:data.user_data_type})
				props.navigation.addListener('didFocus',props.reload);
			}}>
				<Text style={styles.button_text}>
					{data.user_data_type != -1 ? (
						'Внести данные'
					) : (
						'Изменить данные'
					)}
				</Text>
			</TouchableOpacity>
			*/}
		</View>
		{data.prize_list.length ? (
			data.prize_list.map((e,i) => (
				<Item
					key={i}
					promo_id={promo_id}
					user_data_type={data.user_data_type}
					get_type={data.get_type}
					{...e}
					reload={props.reload}
				/>
			))
		) : (
			<View style={styles.empty}><Text style={styles.empty_text}>Пока у вас нет призов</Text></View>
		)}
	</View>
));
