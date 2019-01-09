import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Prize 		from '../../../../templates/prize';
import MainText		from '../../../../templates/main_text';
import SubTitle		from '../../../../templates/subtitle';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingVertical: 25, paddingHorizontal: 10,
	},
	title: {
		paddingHorizontal: 20,
		marginBottom: 20,
	},
	main_text: {
		marginBottom: 15, paddingHorizontal: 20,
		textAlign: 'left'
	},
	button: {
		padding: 7, marginBottom: 30, marginHorizontal: 20,
		borderRadius: 50,
		backgroundColor: 'red',
		width: '40%',
	},
	button_text: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center',
	},
	prizes:{
		paddingVertical: 10
	}
});

export default withNavigation(({navigation,data}) => (
	<ScrollView style={styles.container}>
		<View style={styles.certificates}>
			<SubTitle style={styles.title} text="Сертификаты" />
			<MainText style={styles.main_text} text="Чтобы мы могли отправить сертификаты, необходимо ввести данные" />
			<TouchableOpacity style={styles.button}>
				<Text style={styles.button_text}>Ввести данные</Text>
			</TouchableOpacity>
			<Prize />
		</View>
		<View style={styles.prizes}>
			<SubTitle style={styles.title} text="Призы" />
			<MainText style={styles.main_text} text="Чтобы мы могли отправить призы, необходимо ввести данные" />
			<TouchableOpacity style={styles.button}>
				<Text style={styles.button_text}>Ввести данные</Text>
			</TouchableOpacity>
			<Prize />
			<Prize />
		</View>
	</ScrollView>
));