import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import SubTitle from '../../../../templates/subtitle';
import DateTime from '../../../../templates/date_time';
import Input from '../../../../templates/input';
import QR_scanner from '../../../../templates/qr_scanner';

const styles = StyleSheet.create({
	container: {
		borderTopWidth: 1, borderTopColor: '#ddd',
		paddingTop: 20, paddingHorizontal: 20,
	},
	title: {
		paddingHorizontal: 25, paddingVertical: 0,
	},
	scan: {
		padding: 15,
		marginHorizontal: 20, marginVertical: 20,
		borderRadius: 100,
		backgroundColor: 'red',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	scan_text: {
		color: '#fff',
		fontSize: 20, fontFamily: 'GothamPro-Medium',
		marginLeft: 10,
	},

});

export default withNavigation(class CheckData extends Component {
	constructor(props) {
		super(props);

		this.inputs = {
			date_time: {
				ref: React.createRef(),
				offset: 0,
			},
			summa: {
				ref: React.createRef(),
				offset: 0,
			},
			fn: {
				ref: React.createRef(),
				offset: 0,
			},
			fd: {
				ref: React.createRef(),
				offset: 0,
			},
			fp: {
				ref: React.createRef(),
				offset: 0,
			},
		}

		this.state = {
			scanner_visible: 	false,
			date: 				props.state.date,
			time: 				props.state.time,
			summa: 				props.state.summa,
			fn: 				props.state.fn,
			fd: 				props.state.fd,
			fp: 				props.state.fp,
			date_time_error: 	false,
			date_error: 		false,
			time_error: 		false,
			summa_error: 		false,
			fn_error: 			false,
			fd_error: 			false,
			fp_error: 			false,
		}
	}

	componentDidUpdate(prevProps) {
		if(!Object.is(prevProps,this.props)){
			let props = this.props.state;
			this.setState({
				date: 				props.date,
				time: 				props.time,
				summa: 				props.summa,
				fn: 				props.fn,
				fd: 				props.fd,
				fp: 				props.fp,
				date_time_error: 	props.date_time_error,
				date_error: 		props.date_error,
				time_error: 		props.time_error,
				summa_error: 		props.summa_error,
				fn_error: 			props.fn_error,
				fd_error: 			props.fd_error,
				fp_error: 			props.fp_error,
			})
		}
	}
	changeScanner = (value) =>{
		this.setState({scanner_visible: value});
	}
	update = async (value) => {
		await this.setState({value})
		this.props.update_data(value);
	}
	addCheckData = async (check) => {
		let data = {
			...check,
			date_time_error: 	false,
			date_error: 		false,
			time_error: 		false,
			summa_error: 		false,
			fn_error: 			false,
			fd_error: 			false,
			fp_error: 			false,
		}
		await this.setState({data})
		this.props.update_data(data);
	}

	render() {
		console.log("CheckData", this);
		let state = this.state;
		return (
			<View style={styles.container}>
				<SubTitle style={styles.title} text="Фискальные данные чека" />
				<TouchableOpacity style={styles.scan} onPress={() => state.changeScanner(true)}>
					<Icon name="qrcode" style={{ color: 'white' }} size={25} />
					<Text style={styles.scan_text}>Сканировать QR-код</Text>
				</TouchableOpacity>
				<DateTime
					id={this.inputs.date_time.ref}
					data={state.date}
					time={state.time}
					update={value => this.update(value)}
					error={state.date_time_error}
					dateError={state.date_error}
					timeError={state.time_error}
				/>
				<Input
					id={this.inputs.summa.ref}
					title="Сумма"
					type="numeric"
					value={state.summa}
					update={value => this.update({summa:value, summa_error:false})}
					error={state.summa_error}
				/>
				<Input
					id={this.inputs.fn.ref}
					title="ФН"
					type="numeric"
					value={state.fn}
					update={value => this.update({fn:value, fn_error:false})}
					error={state.fn_error}
				/>
				<Input
					id={this.inputs.fd.ref}
					title="ФД"
					type="numeric"
					value={state.fd}
					update={value => this.update({fd:value, fd_error:false})}
					error={state.fd_error}
				/>
				<Input
					id={this.inputs.fp.ref}
					title="ФП"
					type="numeric"
					value={state.fp}
					update={value => this.update({fp:value, fp_error:false})}
					error={state.fp_error}
				/>
				<QR_scanner
					visible={state.scanner_visible}
					changeScanner={(value) => this.changeScanner(value)}
					addCheckData={addCheckData}
				 />
			</View>
		);
	}
});