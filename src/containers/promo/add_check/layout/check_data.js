import React,{Component} from 'react';
import {FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import QRIcon from '../../../../../assets/ui/qr.png';

import SubTitle		from '../../../../templates/subtitle';
import DateTime		from '../../../../templates/date_time';
import Date			from '../../../../templates/date';
import Time			from '../../../../templates/time';
import Input		from '../../../../templates/input';
import QR_scanner	from '../../../../templates/qr_scanner';

const styles = EStyleSheet.create({
	container: {
		paddingTop: 25, paddingHorizontal: 20,
		borderTopWidth: 1, borderTopColor: '#ddd',
	},
	title: {
		paddingHorizontal: 25, paddingVertical: 0,
	},
	scan: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 40, width: 240,
		marginTop: 5, marginBottom: 15, marginHorizontal: 20,
		borderRadius: 100,
		backgroundColor: '$red',
	},
	scan_image: {
		height: 12, width: 12,
	},
	scan_text: {
		marginLeft: 5, paddingTop: 2,
		color: '#fff',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
	date_time: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	date: {
		width: 150,
	},
	time: {
		width: 120,
	},
});

export default withNavigation(class CheckData extends Component {
	state = {
		scanner_opened: false,
	};

	open  = () => this.setState({scanner_opened:true});
	close = () => this.setState({scanner_opened:false});

	render() {
		let {props,state} = this;

		return (
			<View style={styles.container}>
				<SubTitle style={styles.title} text="Фискальные данные чека" />
				<TouchableOpacity style={styles.scan} onPress={_=>this.open()}>
					<Image style={styles.scan_image} source={QRIcon} />
					<Text style={styles.scan_text}>Сканировать QR-код</Text>
				</TouchableOpacity>
				<View style={styles.date_time}>
					<View style={styles.date}>
						<Date
							title="Дата"
							value={state.date}
							update={props.set_date}
							error={state.date_error}
						/>
					</View>
					<View style={styles.time}>
						<Time
							title="Время"
							value={state.time}
							update={props.set_time}
							error={state.time_error}
						/>
					</View>
				</View>
				<Input
					title="Сумма"
					type="numeric"
					value={state.summa}
					update={sum => this.update({sum})}
					error={state.summa_error}
				/>
				<Input
					title="ФН"
					type="numeric"
					value={state.fn}
					update={fn => this.update({fn})}
					error={state.fn_error}
				/>
				<Input
					title="ФД"
					type="numeric"
					value={state.fd}
					update={fd => this.update({fd})}
					error={state.fd_error}
				/>
				<Input
					title="ФП"
					type="numeric"
					value={state.fp}
					update={fp => this.update({fp})}
					error={state.fp_error}
				/>
				<QR_scanner
					visible={state.scanner_opened}
					close={this.close}
					send_data={props.add_check_data}
				 />
			</View>
		);
	}
});
