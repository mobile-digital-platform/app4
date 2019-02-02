import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View, Image, Alert,Keyboard } from 'react-native';
import { withNavigation } from 'react-navigation';

import CheckPhoto from './check_photo';
import CheckData from './check_data';

const styles = StyleSheet.create({
	container: {
	},
	save: {
		marginHorizontal: 20, 
		marginTop: 15, marginBottom: 30,
		padding: 15,
		borderRadius: 100,
	},
	save_text: {
		fontSize: 20, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
	},
	active_button: {
		backgroundColor: '#f40000',
	},
	active_button_text: {
		color: '#fff',
	},
	passive_button: {
		backgroundColor: '#f1f1f1',
	},
	passive_button_text: {
		color: '#d5d5d5',
	},
});

export default withNavigation(class AddCheck extends Component {
	constructor(props) {
		super(props);

		this.state = {
			disabled:			true,
			photos:				props.photos,
			date: 				props.date,
			time: 				props.time,
			summa: 				props.summa,
			fn: 				props.fn,
			fd: 				props.fd,
			fp: 				props.fp,
			photos_error:		false,
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
			let props = this.props;
			let state = this.state;
			// если абсолютно все поля заполнены - делаем кнопку кликабельной
			this.setState({
				disabled:			!(props.photos?.length && props.date?.length && props.time?.length && props.summa?.length && props.fn?.length && props.fd?.length && props.fp?.length),
				photos:				props.photos,
				date: 				props.date,
				time: 				props.time,
				summa: 				props.summa,
				fn: 				props.fn,
				fd: 				props.fd,
				fp: 				props.fp,
				photos_error:		false,
				date_time_error: 	false,
				date_error: 		false,
				time_error: 		false,
				summa_error: 		false,
				fn_error: 			false,
				fd_error: 			false,
				fp_error: 			false,
			})
		}
	}
	
	update_data =  (data) => {
		//this.setState(data);
		this.props.set_data(data);
	}
	send_data = async () =>{
		let state = this.state;
		Keyboard.dismiss();
		if(state.disabled) return;

		// Отправляем изменения
		await this.setState({disabled:true});
		await this.props.save_data({
			photos: state.photos,
			date: 	state.date,
			time: 	state.time,
			summa: 	state.summa,
			fn: 	state.fn,
			fd: 	state.fd,
			fp: 	state.fp,
		});
		this.setState({disabled:false});
		Alert.alert('Данные успешно сохранены!');
	}

	render() {
		console.log("index addCheck", this);
		let state = this.state;
		return (
			<View style={styles.container}>
				<CheckPhoto
					{...this.props}
					state={this.state}
					update_data={this.update_data}
				/>
				<CheckData
					{...this.props}
					state={this.state}
					update_data={this.update_data}
				/>
				<TouchableOpacity style={[styles.save,styles[(state.disabled ? 'passive' : 'active')+'_button']]} onPress={this.send_data}>
					<Text style={[styles.save_text,styles[(state.disabled ? 'passive' : 'active')+'_button_text']]}>Сохранить чек</Text>
				</TouchableOpacity>
			</View>
		);
	}
});