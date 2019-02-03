import React,{Component} from 'react';
import {Keyboard,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import alert from '../../../../services/alert';

import CheckPhoto	from './check_photo';
import CheckData	from './check_data';

const styles = EStyleSheet.create({
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
		backgroundColor: '$red',
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
	state = {
		ready:				false,
		photo:				[],
		date: 				'',
		time: 				'',
		sum: 				'',
		fn: 				'',
		fd: 				'',
		fp: 				'',
		photo_error:		false,
		date_time_error: 	false,
		date_error: 		false,
		time_error: 		false,
		sum_error: 			false,
		fn_error: 			false,
		fd_error: 			false,
		fp_error: 			false,
	};

	// componentDidUpdate(prev_props) {
	// 	if(!Object.is(prev_props,this.props)) {
	// 		let props = this.props;
	// 		// если абсолютно все поля заполнены - делаем кнопку кликабельной
	// 		this.setState({
	// 			disabled: !(
	// 				props.photo?.length &&
	// 				props.date?.length &&
	// 				props.time?.length &&
	// 				props.sum?.length &&
	// 				props.fn?.length &&
	// 				props.fd?.length &&
	// 				props.fp?.length
	// 			),
	// 			photo:				props.photo,
	// 			date: 				props.date,
	// 			time: 				props.time,
	// 			sum: 				props.sum,
	// 			fn: 				props.fn,
	// 			fd: 				props.fd,
	// 			fp: 				props.fp,
	// 			photo_error:		false,
	// 			date_time_error: 	false,
	// 			date_error: 		false,
	// 			time_error: 		false,
	// 			sum_error: 		false,
	// 			fn_error: 			false,
	// 			fd_error: 			false,
	// 			fp_error: 			false,
	// 		})
	// 	}
	// }

	check_completeness = () => {

	}

	add_photo		= (data) => this.setState(({photo}) => ({photo:[...photo,data]}));
	remove_photo	= (id)   => this.setState(({photo}) => ({photo:photo.filter(item => item.id!=id)}));

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
			photo:	state.photo,
			date: 	state.date,
			time: 	state.time,
			sum: 	state.sum,
			fn: 	state.fn,
			fd: 	state.fd,
			fp: 	state.fp,
		});
		this.setState({disabled:false});
		alert('Данные успешно сохранены!');
	}

	render() {
		console.log("index addCheck", this);
		let state = this.state;
		return (
			<View style={styles.container}>
				<CheckPhoto
					photo={state.photo}
					add_photo={this.add_photo}
					remove_photo={this.remove_photo}
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
