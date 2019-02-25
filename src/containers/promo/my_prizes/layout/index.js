import React from 'react';
import {FlatList,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Section from './section';

const styles = EStyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#fff',
	},
	list: {
		paddingHorizontal: 10,
	},
	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	empty_text: {
		paddingBottom: '20%',
		color: '#3d3d3d',
		fontSize: 12, fontFamily: 'GothamPro',
		textAlign: 'center',
		lineHeight: 16,
	},
});

export default (props) => (
	<View style={styles.container}>
	{props.loading || props.list.length ? (
		<FlatList
			style={styles.list}
			data={props.list}
			renderItem={({item}) => <Section promo_id={props.promo_id} data={item} />}
			keyExtractor={item => item.group_id+''}
			onRefresh={props.reload}
			refreshing={props.loading}
		/>
	) : (
		<View style={styles.empty}><Text style={styles.empty_text}>Пока у вас нет призов</Text></View>
	)}
	</View>
);
