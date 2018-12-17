import React from 'react';
import {StyleSheet,FlatList,TouchableOpacity,Text,View} from 'react-native';

import Item from './item';

const styles = StyleSheet.create({
	container: {
		padding: 30,
		borderRadius: 20,
		backgroundColor: '#f4f4f4',
	},
	title: {
		marginBottom: 10,
		color: '#bbb',
		fontSize: 14, fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	save: {
		marginTop: 15, padding: 15,
		borderRadius: 100,
		backgroundColor: 'red',
	},
	save_text: {
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
	},
});

const data = {
	loyalty_card: [
		{
			id: 1,
			number: '2645 9275 2746 2056',
			retailer: {
				id: 1,
				name: 'Пятерочка',
			},
		},
		{
			id: 2,
			number: '2645 9275 2746 2056',
			retailer: {
				id: 2,
				name: 'Лента',
			},
		},
		{
			id: 3,
			number: '2645 9275 2746 2056',
			retailer: {
				id: 3,
				name: 'Магнит',
			},
		},
	],
}

export default () => (
	<View style={styles.container}>
		<Text style={styles.title}>Карты лояльности</Text>
		<FlatList
			data={data.loyalty_card}
			renderItem={({item}) => (<Item data={item} />)}
			keyExtractor={item => ''+item.id}
		/>
		<TouchableOpacity style={styles.save}><Text style={styles.save_text}>Добавить карту</Text></TouchableOpacity>
	</View>
);
