import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Input		from '../../../../templates/input';
import SelectCity	from '../../../../templates/select_city';
import MainText		from '../../../../templates/main_text';
import SubTitle		from '../../../../templates/subtitle';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingVertical: 25, paddingHorizontal: 20,
	},
	area: {
		paddingBottom: 30
	},
	main_text: {
		marginBottom: 25,
	},
	title: {
		paddingBottom: 25, paddingHorizontal: 20,
	},
	save: {
		marginTop: 40,
		padding: 15,
		borderRadius: 100,
		backgroundColor: '#f1f1f1',
	},
	save_text: {
		color: '#d5d5d5',
		fontSize: 20,
		textAlign: 'center',
	}
});

export default withNavigation(({navigation,data}) => (
	<ScrollView style={styles.container}>
			<View style={styles.area}>
				<MainText style={styles.main_text} text="Заполните форму для получения выигрыша почтой." />
				<Input title="Имя" />
				<Input title="Отчество" />
				<Input title="Фамилия" />
			</View>
			<View style={styles.area}>
				<SubTitle style={styles.title} text="Укажите адрес доставки" />
				<SelectCity/>
				<SelectCity/>
				<SelectCity/>
				<SelectCity/>
				<TouchableOpacity style={styles.save} onPress={this.send}>
					<Text style={styles.save_text}>Отправить</Text>
				</TouchableOpacity>
			</View>
			
	</ScrollView>
));
