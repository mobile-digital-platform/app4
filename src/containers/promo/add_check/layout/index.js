import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
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
			disabled:			false,
			waiting:			false,
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

	/* componentDidMount() {
		this.setState(this.props.check);
	} */
	componentDidUpdate(prevProps) {
		if(!Object.is(prevProps,this.props)){
			let props = this.props;
			let state = this.state;
			// если поле с ошибкой заполнено - убираем предупреждение
			let tempState = {
				photos:				props.photos,
				date: 				props.date,
				time: 				props.time,
				summa: 				props.summa,
				fn: 				props.fn,
				fd: 				props.fd,
				fp: 				props.fp,
				photos_error:		!props.photos?.length && state.photos_error,
				date_error: 		!props.date?.length && state.date_error,
				time_error: 		!props.time?.length && state.time_error,
				summa_error: 		!props.summa?.length && state.summa_error,
				fn_error: 			!props.fn?.length && state.fn_error,
				fd_error: 			!props.fd?.length && state.fd_error,
				fp_error: 			!props.fp?.length && state.fp_error,
			};
			// если абсолютно все поля заполнены - делаем кнопку кликабельной
			this.setState({
				...tempState,
				disabled:			!!(tempState.photos_error || tempState.date_error || tempState.time_error || tempState.summa_error || tempState.fn_error || tempState.fp_error || tempState.fd_error),
				date_time_error: 	(tempState.date_error || tempState.time_error) && state.date_time_error,
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
		if(state.waiting || state.disabled) return;

		// Проверяем наличие фотографии чека
		if(!state.photos.length) {
			this.setState({photo_error:'Добавьте фотографию чека'});
			return;
		} else {
			await this.setState({photo_error:false});
		}
		// Проверяем дату и время покупки
		if(!state.date.length && !state.time.length) {
			this.props.scroll.current.scrollTo({y:this.inputs.date_time.offset});
			this.setState({date_time_error:'Введите дату и время',date_error:'пусто',time_error:'пусто'});
			return;
		} else if(!state.date.length){
			this.props.scroll.current.scrollTo({y:this.inputs.date_time.offset});
			this.setState({date_time_error:'Введите дату',date_error:'пусто',time_error:false});
			return;
		} else if(!state.time.length ){
			this.props.scroll.current.scrollTo({y:this.inputs.date_time.offset});
			this.setState({date_time_error:'Введите время',date_error:false,time_error:'пусто'});
			return;
		} else {
			await this.setState({date_time_error:false,date_error:false,time_error:false});
		}
		// Проверяем сумму покупки
		if(!state.summa.length) {
			this.props.scroll.current.scrollTo({y:this.inputs.summa.offset});
			this.setState({summa_error:'Введите сумму покупки'});
			return;
		} else {
			await this.setState({summa_error:false});
		}
		// Проверяем ФН
		if(!state.fn) {
			this.props.scroll.current.scrollTo({y:this.inputs.fn.offset});
			this.setState({fn_error:'Введите номер фискального накопителя (ФН)'});
			return;
		} else {
			await this.setState({fn_error:false});
		}
		// Проверяем ФД
		if(!state.fd) {
			this.props.scroll.current.scrollTo({y:this.inputs.fd.offset});
			this.setState({fd_error:'Введите номер фискального документа (ФД)'});
			return;
		} else {
			await this.setState({fd_error:false});
		}
		// Проверяем ФП
		if(!state.fp) {
			this.props.scroll.current.scrollTo({y:this.inputs.fp.offset});
			this.setState({fp_error:'Введите номер фискального признака (ФП)'});
			return;
		} else {
			await this.setState({fp_error:false});
		}

		// Отправляем изменения
		await this.setState({waiting:true});
		await this.props.save_data({
			photos: state.photos,
			date: 	state.date,
			time: 	state.time,
			summa: 	state.summa,
			fn: 	state.fn,
			fd: 	state.fd,
			fp: 	state.fp,
		});
		this.setState({waiting:false});
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
				<TouchableOpacity style={[styles.save,styles[((state.waiting || state.disabled) ? 'passive' : 'active')+'_button']]} onPress={this.send_data}>
					<Text style={[styles.save_text,styles[((state.waiting || state.disabled) ? 'passive' : 'active')+'_button_text']]}>Сохранить чек</Text>
				</TouchableOpacity>
			</View>
		);
	}
});