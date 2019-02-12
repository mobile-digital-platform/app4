import React from 'react';
import {FlatList,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Section from './section';

const styles = EStyleSheet.create({
	container:{
		flex: 1,
		paddingHorizontal: 10,
		backgroundColor: '#fff',
	},
});

export default (props) => (
	<FlatList
		style={styles.container}
		data={props.list}
		renderItem={({item}) => <Section data={item} />}
		keyExtractor={item => item.group_id+''}
		onRefresh={props.reload}
		refreshing={props.loading}
	/>
);
