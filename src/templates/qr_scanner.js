import React,{Component} from 'react';
import {Dimensions,FlatList,Image,ImageBackground,Modal,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import EStyleSheet from 'react-native-extended-stylesheet';

import alert from '../services/alert';

import Icon from 'react-native-vector-icons/EvilIcons';

const width = Dimensions.get('window').width;
const styles = EStyleSheet.create({
	modal: {
		flex: 1,
	},
	camera: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	close_area: {
		alignItems: 'flex-end',
		width: '100%',
		marginTop: 15,
		// backgroundColor: '#fff',
	},
	close: {
		margin: 15, padding: 15,
		borderRadius: 15,
		backgroundColor: 'rgba(255,255,255,0.1)',
		zIndex: 10,
	},
	focus: {
		height: 0.45*width, width: 0.45*width,
		marginBottom: '20%',
	},
	focus_corner: {
		position: 'absolute',
		height: '15%', width: '15%',
		borderColor: '#fff',
	},
	focus_top_left: {
		top: 0, left: 0,
		borderTopWidth: 3, borderLeftWidth: 3,
	},
	focus_top_right: {
		top: 0, right: 0,
		borderTopWidth: 3, borderRightWidth: 3,
	},
	focus_bottom_left: {
		bottom: 0, left: 0,
		borderBottomWidth: 3, borderLeftWidth: 3,
	},
	focus_bottom_right: {
		bottom: 0, right: 0,
		borderBottomWidth: 3, borderRightWidth: 3,
	},
	footer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 60, width: '100%',
		backgroundColor: '$red',
	},
	footer_text: {
		color: '#fff',
		fontSize: 16, fontFamily: 'GothamPro',
	},
});

export default class QR extends Component {
	state = {
		torch: RNCamera.Constants.FlashMode.off,
	};

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
			d: check.t.substr(6,2),
			m: check.t.substr(4,2),
			y: check.t.substr(0,4),

			h: check.t.substr(9,2),
			i: check.t.substr(11,2),
		};
		let data = {
			datetime: new Date(time.y+'-'+time.m+'-'+time.d+' '+time.h+':'+time.i),
			date: time.y+'-'+time.m+'-'+time.d,
			time: time.h+':'+time.i,

			sum: check.s,
			fn: check.fn,
			fd: check.i,
			fp: check.fp,
		};
		return data;
	}
	read_code = async (res) => {
		// res.data = t=20170426T100348&s=259.00&fn=8710000100388285&i=1472&fp=1421230762&n=1
		let check = {};
		res.data.split('&').forEach(item => {
			item = item.split('=');
			check[item[0]] = item[1];
		});
		// проверяем, содержит ли qr нужные данные или же там закодирована ссылка на сайт
		if(![check.t,check.s,check.fn,check.i,check.fp,check.n].every(e => !!e)) {
			alert('Увы, данный QR-код не подходит','Поищите на чеке другой');
			console.log('QR-data',res);
		} else {
			this.props.send_data(this.parse_qr(check));
			this.props.close();
		}
	}

	render() {
		let props = this.props;
		console.log(RNCamera.Constants);

		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={props.visible}
				onRequestClose={this.props.close}
			>
				<View style={styles.modal}>
					<RNCamera
						ref={ref => this.camera=ref}
						style={styles.camera}
						captureAudio={false}
						flashMode={this.state.torch}
						barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
						onBarCodeRead={this.read_code}
						onCameraReady={_=>this.setState({torch:RNCamera.Constants.FlashMode.torch})}
					>
						<View style={styles.close_area}>
							<TouchableOpacity style={styles.close} onPress={this.props.close}>
								<Icon name="close" style={{color:'white'}} size={40} />
							</TouchableOpacity>
						</View>
						<View style={styles.focus}>
							<View style={[styles.focus_corner,styles.focus_top_left]} />
							<View style={[styles.focus_corner,styles.focus_top_right]} />
							<View style={[styles.focus_corner,styles.focus_bottom_left]} />
							<View style={[styles.focus_corner,styles.focus_bottom_right]} />
						</View>
						<View style={styles.footer}>
							<Text style={styles.footer_text}>Поднесите камеру к штрих-коду</Text>
						</View>
					</RNCamera>
				</View>
			</Modal>
		);
	}
}
