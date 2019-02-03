import React,{Component} from 'react';
import {FlatList,Image,ImageBackground,Modal,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {QRscanner} from 'react-native-qr-scanner';
import EStyleSheet from 'react-native-extended-stylesheet';

import alert from '../services/alert';

import Icon from 'react-native-vector-icons/EvilIcons';

const styles = EStyleSheet.create({
	modal: {
		flex: 1,
	},
	close: {
		position: 'absolute', top: 30, right: 15,
		zIndex: 10,
	},
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute', bottom: 0,
		height: 65, width: '100%',
		backgroundColor: '$red',
		zIndex: 10,
	},
	footer_text: {
		color: 'white',
		fontSize: 16,
	},
});

export default class QR extends Component {

	parse_qr = (check) => {
		/* check = {
			fn: "8710000100388285",
			fp: "1421230762",
			i: "1472",
			n: "1",
			s: "259.00",
			t: "20170426T100348"
		}; */
		let time = {
			day: check.t.substr(6,2),
			month: check.t.substr(4,2),
			year: check.t.substr(0,4),

			hour: check.t.substr(9,2),
			minutes: check.t.substr(11,2),
		};
		let data = {
			date: time.day+' . '+time.month+' . '+time.year,
			time: time.hour+' : '+time.minutes,

			sum: check.s,
			fn: check.fn,
			fd: check.i,
			fp: check.fp,
		};
		return data;
	}
	read_code = (res) => {
		// res.data = t=20170426T100348&s=259.00&fn=8710000100388285&i=1472&fp=1421230762&n=1
		let check = {};
		res.data.split('&').forEach(function (item) {
			item = item.split('=');
			check[item[0]] = item[1];
		});
		this.closeScanner();
		// проверяем, содержит ли qr нужные данные или же там закодирована ссылка на сайт
		if(![check.t,check.s,check.fn,check.i,check.fp,check.n].every(e => !!e)) {
			alert('Увы, данный QR-код не подходит','Поищите на чеке другой');
			console.log('QR-data',res);
		} else {
			this.props.send_data(this.parse_qr(check));
		}
	}

	render() {
		let props = this.props;

		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={props.visible}
				onRequestClose={this.props.close}
			>
				<View style={styles.modal}>
					<TouchableOpacity style={styles.close} onPress={this.props.close}>
						<Icon name="close" style={{color:'white'}} size={40} />
					</TouchableOpacity>
					<QRscanner
					    isRepeatScan={true}
						onRead={this.read_code}
						flashMode={true}
						finderX={0}
						finderY={-60}
						maskColor="rgba(0,0,0,0.5)"
						rectHeight={220*EStyleSheet.value("$scale")}
						rectWidth={220*EStyleSheet.value("$scale")}
						cornerBorderWidth={3*EStyleSheet.value("$scale")}
						cornerColor="white"
						scanBarHeight={2*EStyleSheet.value("$scale")}
						scanBarColor={EStyleSheet.value("$red")}
						bottomHeight={0}
						renderBottomView={_=><View/>}
						hintText=""
					/>
					<View style={styles.footer}>
						<Text style={styles.footer_text}>Поднесите камеру к штрих-коду</Text>
					</View>
				</View>
			</Modal>
		);
	}
}
