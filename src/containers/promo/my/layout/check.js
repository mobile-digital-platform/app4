import React,{Component} from 'react';
import {StyleSheet,Image,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Question		from '../../../../../assets/ui/question.png';
import Confirmed	from '../../../../../assets/ui/voucher_confirmed.png';
import NotConfirmed	from '../../../../../assets/ui/voucher_not_confirmed.png';

import Dialog		from '../../../../templates/dialog';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	left: {
		alignItems: 'center',
		width: 50,
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
	scores_voucher: {
		height: 25, width: 20,
	},
	area: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
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

export default withNavigation(class MyPromoListCheckLayout extends Component {
	state = {
		show_dialog: false,
	};

	open_dialog  = () => this.setState({show_dialog:true});
	close_dialog = () => this.setState({show_dialog:false});

	render() {
		let {navigation,data,extra} = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.left}>
				{data.scores>0 ? (
					<Text style={[styles.scores,(data.state=="Подтвержден" ? styles.right : styles.wrong)]}>
						<Text style={styles.scores_number}>{'+'+data.scores}</Text>
						{'\n'}
						<Text style={styles.scores_text}>{extra.points_type}</Text>
					</Text>
				) : (
					<Image style={styles.scores_voucher} source={data.state=="Подтвержден" ? Confirmed : NotConfirmed} />
				)}
				</View>
				<View style={styles.area}>
					<View>
						{data.number ? (<Text style={[styles.number,(data.state=="Подтвержден" ? styles.right : styles.wrong)]}>{data.number}</Text>) : null}
						<Text style={styles.state}>{data.date} — {data.state}</Text>
					</View>
					{data.state=="Отклонен" ? (
						<TouchableOpacity style={styles.fail} onPress={this.open_dialog}><Image style={styles.question} source={Question} /></TouchableOpacity>
					) : null}
				</View>
				<Dialog
					visible={this.state.show_dialog}
					text={data.details}
					on_next={this.close_dialog}
				/>
			</View>
		);
	}
});
