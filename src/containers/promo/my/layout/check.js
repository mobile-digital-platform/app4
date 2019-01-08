import React from 'react';
import {StyleSheet,ImageBackground,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
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
		fontSize: 22, fontWeight: 'bold',
	},
	scores_text: {
		fontSize: 14,
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
		fontSize: 14,
	},
	state: {
		color: '#bbb',
		fontSize: 14,
	},
	fail: {
		marginBottom: -5,
	},
});

let check_state = (state) => ['проверяется','подтвержден','не принят'][state];
// let date = (timestamp) => '01.11.2018'; // (new Date(timestamp).getDay())+'.'+(new Date(timestamp).getMonth())+'.'+(new Date(timestamp).getYear());

export default withNavigation(({navigation,data}) => (
	<View style={styles.container}>
		<Text style={[styles.scores,(data.state==1 ? styles.right : styles.wrong)]}>
			<Text style={styles.scores_number}>{data.scores>0 ? '+' : ''}{data.scores}</Text>
			{'\n'}
			<Text style={styles.scores_text}>баллов</Text>
		</Text>
		<View style={styles.area}>
			<View>
				<Text style={[styles.number,(data.state==1 ? styles.right : styles.wrong)]}>{data.number}</Text>
				<Text style={styles.state}>{data.date} — {data.state}</Text>
			</View>
			{data.state==2 ? (
				<TouchableOpacity style={styles.fail}><Icon name="question" style={{color:'red'}} size={30} /></TouchableOpacity>
			) : null}
		</View>
	</View>
));
