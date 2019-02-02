import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Personal		from './personal';
import Download		from './download';


const styles = StyleSheet.create({
	container: {
		paddingVertical: 25, paddingHorizontal: 20,
		backgroundColor: '#fff',
	},
});

export default withNavigation(({navigation,data}) => (
	<ScrollView style={styles.container}>
		<Personal />
		<Download />
	</ScrollView>
));
