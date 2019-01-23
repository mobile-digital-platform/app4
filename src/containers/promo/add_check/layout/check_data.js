import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import SubTitle from '../../../../templates/subtitle';
import DateTime from '../../../../templates/date_time';
import Input from '../../../../templates/input';

const styles = StyleSheet.create({
	container: {
		borderTopWidth: 1, borderTopColor: '#ddd',
		paddingVertical: 20, paddingHorizontal: 20,
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
		fontSize: 20,
		marginLeft: 10,
	},
	save: {
		marginVertical: 15, padding: 15,
		borderRadius: 100,
		backgroundColor: '#f1f1f1',
	},
	save_text: {
		color: '#d5d5d5',
		fontSize: 20,
		textAlign: 'center',
	}
});

export default withNavigation(class CheckData extends Component {
	constructor(props) {
		super(props);
	}

	openScanner = () =>{
		this.props.change_qr(true);
	}
	update = () =>{

	}
	render() {
		console.log("CheckData", this);
		state = this.props;
		return (
			<View style={styles.container}>
				<SubTitle style={styles.title} text="Фискальные данные чека" />
				<TouchableOpacity style={styles.scan} onPress={this.openScanner}>
					<Icon name="qrcode" style={{ color: 'white' }} size={25} />
					<Text style={styles.scan_text}>Сканировать QR-код</Text>
				</TouchableOpacity>
				<DateTime
					data={state.date}
					time={state.time}
				/>
				<Input
					title="Сумма"
					type="numeric"
					value={state.summa}
					update={value => this.update({summa:value})}
				/>
				<Input
					title="ФН"
					type="numeric"
					value={state.fn}
					update={value => this.update({fn:value})}
				/>
				<Input
					title="ФД"
					type="numeric"
					value={state.fd}
					update={value => this.update({fd:value})}
				/>
				<Input
					title="ФП"
					type="numeric"
					value={state.fp}
					update={value => this.update({fp:value})}
				/>
				<TouchableOpacity style={styles.save} onPress={this.send}>
					<Text style={styles.save_text}>Сохранить чек</Text>
				</TouchableOpacity>
			</View>
		);
	}
});