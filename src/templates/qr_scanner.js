import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, Dimensions, Text, TouchableOpacity, View, Image, Modal, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/EvilIcons';
import { QRscanner } from 'react-native-qr-scanner';

const styles = StyleSheet.create({
	modal: {
		flex: 1,
	},
	footer: {
		position: 'absolute', 
		bottom: 0, zIndex: 10,
		width: '100%', height: 65,
		backgroundColor: 'red',
		justifyContent: 'center',
	},
	footer_text: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18, width: '100%',
	},
	close: {
		position: 'absolute',
		top: '3%', right: '3%',
		zIndex: 10,
	},
});

export default withNavigation(class QR extends Component {
	constructor(props) {
		super(props);
		this.state= {
			visible: this.props.visible
		};
		console.log('конструктор qr');
	}

	componentDidUpdate(prevProps) {
		if(!Object.is(prevProps,this.props)){
			this.setState({
				visible: this.props.visible
			})
		}
	}
	closeScanner = () =>{
		//this.setState({visible: false});
		this.props.changeScanner({visible: false});
	}
	readCode(res) {
		// res.data = t=20170426T100348&s=259.00&fn=8710000100388285&i=1472&fp=1421230762&n=1
		var check = {};
		res.data.split('&').forEach(function (item) {
			item = item.split('=');
			check[item[0]] = item[1];
		});
		/* check = {
			fn: "8710000100388285",
			fp: "1421230762",
			i: "1472",
			n: "1",
			s: "259.00",
			t: "20170426T100348"
		} */
		var time = {
			day: check.t.substr(6, 2),
			month: check.t.substr(4, 2),
			year: check.t.substr(0, 4),

			hour: check.t.substr(9, 2),
			minutes: check.t.substr(11, 2),
		}
		var data = {
			date: time.day+' . '+time.month+' . '+time.year,
			time: time.hour+' : '+time.minutes,

			summa: check.s,
			fn: check.fn,
			fd: check.i,
			fp: check.fp,
		}
		console.log('QR-data: ', data);
		this.closeScanner();
		this.props.addCheckData(data);
	}

	render() {

		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={this.state.visible}
				onRequestClose={this.closeScanner}>
				<View style={styles.modal}>
					<TouchableOpacity style={styles.close} onPress={this.closeScanner}>
						<Icon name="close" style={{ color: 'white' }} size={40} />
					</TouchableOpacity>
					<QRscanner
					    isRepeatScan={true}
						onRead={this.readCode}
						flashMode={true}
						finderX={0}
						finderY={-60}
						maskColor="rgba(0,0,0,0.5)"
						rectHeight={220}
						rectWidth={220}
						cornerBorderWidth={5}
						cornerColor="white"
						scanBarColor="red"
						scanBarHeight={2}
						bottomHeight={0}
						renderBottomView={()=> <View />}
						hintText=""
					/>
					<View style={styles.footer}>
						<Text style={styles.footer_text}>Поднесите камеру к шртих-коду</Text>
					</View>
				</View>
			</Modal>
		);
	}
});