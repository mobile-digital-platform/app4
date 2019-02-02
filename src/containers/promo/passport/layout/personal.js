import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import Input		from '../../../../templates/input';
import Date			from '../../../../templates/date';
import TextArea		from '../../../../templates/textarea';
import SeriaNumber	from '../../../../templates/seria_number';
import MainText		from '../../../../templates/main_text';
import SubTitle		from '../../../../templates/subtitle';

const styles = StyleSheet.create({
	container: {
	},
	area: {
		paddingBottom: 15,
	},
	main_text: {
		marginBottom: 20,
	},
	title: {
		paddingTop: 25, paddingBottom: 10,
		paddingHorizontal: 20,
	},
});

export default withNavigation(({navigation,data}) => (
	<View>
		<MainText style={styles.main_text} text="В соответствии с законодательством, для получения выигрыша требуются ваши паспортные данные и ИНН." />
		<View style={styles.area}>
			<Input 
				title="Имя"
			/>
			<Input 	
				title="Отчество"
			/>
			<Input 
				title="Фамилия" />
			<Date title="Дата рождения" />
		</View>
		<View>
			<SubTitle style={styles.title} text="Паспорт" />
			<SeriaNumber />
			<Date title="Дата выдачи паспорта" />
			<Input 
				title="Кем выдан"
			/>
			<SubTitle style={styles.title} text="Адрес регистрации" />
			<TextArea />
			<SubTitle style={styles.title} text="ИНН" />
			<Input 
				title="ИНН (12 цифр)"
				type="numeric"
				length={12}
			/>
		</View>
	</View>
));
