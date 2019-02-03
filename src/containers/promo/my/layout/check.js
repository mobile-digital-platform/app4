import React from 'react';
import {StyleSheet,Image,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Question		from '../../../../../assets/ui/question.png';
import Confirmed	from '../../../../../assets/ui/voucher_confirmed.png';
import NotConfirmed	from '../../../../../assets/ui/voucher_not_confirmed.png';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingVertical: 20,
	},
	right: {
		color: '#000',
	},
	wrong: {
		color: '#bbb',
	},
	scores: {
		textAlign: 'center',
	},
	scores_number: {
		fontSize: 18, fontWeight: 'bold',
	},
	scores_text: {
		fontSize: 12,
	},
	area: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginLeft: 20,
	},
	number: {
		marginBottom: 8,
		fontSize: 12,
	},
	state: {
		color: '#bbb',
		fontSize: 12,
	},
	fail: {
		marginBottom: -5,
	},
	question: {
		height: 18, width: 18,
	},
});

let check_state = (state) => ['проверяется','подтвержден','не принят'][state];
// let date = (timestamp) => '01.11.2018'; // (new Date(timestamp).getDay())+'.'+(new Date(timestamp).getMonth())+'.'+(new Date(timestamp).getYear());

export default withNavigation(({navigation,data}) => (
	<View style={styles.container}>
		<Text style={[styles.scores,(data.state=="Подтвержден" ? styles.right : styles.wrong)]}>
			<Text style={styles.scores_number}>
			{data.scores>0 ? (
				'+'+data.scores
			) : (
				<Image style={styles.scores_voucher} source={data.state=="Подтвержден" ? Confirmed : NotConfirmed} />
			)}
			</Text>
			{'\n'}
			<Text style={styles.scores_text}>баллов</Text>
		</Text>
		<View style={styles.area}>
			<View>
				<Text style={[styles.number,(data.state=="Подтвержден" ? styles.right : styles.wrong)]}>{data.number}</Text>
				<Text style={styles.state}>{data.date} — {data.state}</Text>
			</View>
			{data.state=="Отклонен" ? (
				<TouchableOpacity style={styles.fail}><Image style={styles.question} source={Question} /></TouchableOpacity>
			) : null}
		</View>
	</View>
));
