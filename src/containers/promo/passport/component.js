import React,{Component} from 'react';
import {StyleSheet,ScrollView,TouchableOpacity,View,Text} from 'react-native';
import {withNavigation} from 'react-navigation';

import {request} from '../../../redux/reducers/settings';

import alert from '../../../services/alert';
import st		from '../../../services/storage';

import Layout from './layout';

export default withNavigation(class PromoPassportComponent extends Component {
	state = {
		photo_list: [
			{state:0,error:''},
			{state:0,error:''},
			{state:0,error:''},
		],
		error: '',
		save_state: 'initial',
	};

	componentDidMount() {
		this.id = this.props.navigation.getParam('id',2);
		this.user_data_type	= this.props.navigation.getParam('user_data_type',2);
	}

	send_data = async (data) => {
		this.setState({save_state:'waiting'});

		let {response,error} = await request.set_passport_data({
			promo_id:	this.id,
			user_id:	this.props.user.id,
			name:		data.name,
			father:		data.father,
			family:		data.family,
			birthday:	data.birthday,
			// mail:		this.props.user.mail,
			seria:		data.seria,
			number:		data.number,
			date:		data.date,
			issuer:		data.issuer,
			inn:		data.inn,
			address:	data.address,
		});
		if(response) {
			let obj = {
				name:		data.name,
				father:		data.father,
				family:		data.family,
				birthday:	data.birthday,
				passport: {
					seria:		data.seria,
					number:		data.number,
					date:		data.date,
					issuer:		data.issuer,
					inn:		data.inn,
					address:	data.address,
				},
			};

			// Сохраняем
			this.props.update_user(obj);

			// В асинхронное хранилище изменения тоже записываем
			st.merge('user',obj);

			this.send_photos([data.passport_photo,data.passport_residence,data.inn_photo]);
		}
		if(error) {
			this.setState({save_state:'errored'});
			await alert("Не удалось отправить данные",error.message);
			return;
		}
	}

	send_photos = async (data) => {
		let {photo_list} = this.state;

		// Загружаем все фотографии, которые еще не были загружены
		let waiting = [];
		for(let i=0; i<data.length; i++) {
			let photo = data[i];

			// Если она еще не загружена успешно, то загружаем
			if(photo_list[i].state != 1) {
				waiting.push(new Promise(async (resolve) => {
					let image_data = await request.add_passport_photo({
						user_id: this.props.user.id,
						type: i+1,
						file: photo.base64,
					});
					if(image_data.response) {
						this.setState(({photo_list}) => {
							photo_list[i] = {
								state: 1,
								error: '',
							};
							return {photo_list};
						});
					}
					if(image_data.error) {
						this.setState(({photo_list}) => {
							photo_list[i] = {
								state: 2,
								error: image_data.error.message,
							};
							return {photo_list};
						});
					}
					resolve();
				}));
			}
		}

		// Ждем, пока все загрузится
		await Promise.all(waiting);
		for(let i=0; i<photo_list.length; i++) {
			let photo = photo_list[i];

			if(photo.state == 2) {
				this.setState({
					error: photo.error,
					save_state: 'errored',
				});
				await alert("Не удалось загрузить фотографии",photo.error+'\nПопробуйте еще раз');
				return;
			}
		}

		// Если ошибок нет, то все успешно!
		await this.setState({save_state:'succeed'});
	}

	back = () => {
		if(this.state.save_state == 'succeed') this.props.navigation.navigate('promo_my_prizes');
	}

	render() {
		console.log("Component",this.props);

		return (
			<Layout
				{...this.props}
				state={this.state.save_state}
				send_data={this.send_data}
				button_on_end={this.back}
			/>
		);
	}
});
