import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import MainText		from '../../../../templates/main_text';
import SubTitle		from '../../../../templates/subtitle';
import Prize		from '../../../../templates/prize';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingVertical: 25, paddingHorizontal: 10,
	},
	point_info:{
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 30,
	},
	point_text:{
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 18,
		color: '#3D3D3D',
	},
	point_number:{
		fontWeight: 'bold',
		marginLeft: 5,
		fontSize: 18,
		color: '#3D3D3D',
	},
});

export default withNavigation(({navigation,data}) => (
	<ScrollView style={styles.container}>
		<View style={styles.point_info}>
			<Text style={styles.point_text}>Твои баллы:</Text>
			<Text style={styles.point_number}>50</Text>
		</View>
		<Prize />
		<Prize />
		<Prize />
		<Prize />
	</ScrollView>
));