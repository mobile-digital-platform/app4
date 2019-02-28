import React,{Component} from 'react';
import {Dimensions,FlatList,Image,ImageBackground,Modal,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import EStyleSheet from 'react-native-extended-stylesheet';

import config from '../config';

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
	focus_area: {
		flex: 1,
			justifyContent: 'center',
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
	error: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		padding: 15,
		// backgroundColor: '$red',
	},
	error_text: {
		color: '#fff',
		fontSize: 16, fontFamily: 'GothamPro',
		textAlign: 'center',
		textShadowRadius: 5, textShadowColor: '#111',
		lineHeight: 19,
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
	constructor(props) {
		super(props);

		this.error_timeout;

		this.state = {
			torch: RNCamera.Constants.FlashMode.off,
			tint: config.qr_scanner.tint.base,
			error: '',
		};
	}

	componentDidMount() {
		this.tire_tint();
	}

	// Смена надписи под сканером
	tire_tint = () => {
		this.setState({tint:config.qr_scanner.tint.base});
		setTimeout(_=>{
			if(this.error_timeout)	this.tire_tint();
			else					this.setState({tint:config.qr_scanner.tint.tired});
		},10000);
	}

	// Разбор кода
	parse_qr = (check) => {
		let d = check.t.substr( 6,2),
			m = check.t.substr( 4,2),
			y = check.t.substr( 0,4),
			h = check.t.substr( 9,2),
			i = check.t.substr(11,2);
		
		return {
			datetime: new Date(y+'-'+m+'-'+d+' '+h+':'+i),
			date: y+'-'+m+'-'+d,
			time: h+':'+i,

			sum: check.s,
			fn: check.fn,
			fd: check.i,
			fp: check.fp,
		};
	}
	read_code = async (res) => {
		let check = {};
		res.data.split('&').forEach(item => {
			item = item.split('=');
			check[item[0]] = item[1];
		});

		// Проверяем, содержит ли код нужные данные
		if([check.t,check.s,check.fn,check.i,check.fp,check.n].every(e => !!e)) {
			this.setState({error:''});
			this.props.send_data(this.parse_qr(check));
			this.props.close();

		// Или же тут закодирована ссылка на сайт
		} else {
			this.setState({error:config.qr_scanner.error});
			if(!this.error_timeout) this.error_timeout = setTimeout(_=>{
				this.setState({error:''});
				this.error_timeout = null;
				this.tire_tint();
			},2000);
			// console.log('QR-data',res);
		}
	}

	render() {
		let {props,state} = this;

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
						<View style={styles.focus_area}>
							<View style={styles.focus}>
								<View style={[styles.focus_corner,styles.focus_top_left]} />
								<View style={[styles.focus_corner,styles.focus_top_right]} />
								<View style={[styles.focus_corner,styles.focus_bottom_left]} />
								<View style={[styles.focus_corner,styles.focus_bottom_right]} />
							</View>
						</View>
						<View style={styles.error}>
							<Text style={styles.error_text}>{state.error}</Text>
						</View>
						<View style={styles.footer}>
							<Text style={styles.footer_text}>{state.tint}</Text>
						</View>
					</RNCamera>
				</View>
			</Modal>
		);
	}
}
