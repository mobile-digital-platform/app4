import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request as promo_request}		from '../../../../redux/reducers/promo';
import {request as settings_request}	from '../../../../redux/reducers/settings';

import alert 	from '../../../../services/alert';
import st		from '../../../../services/storage';

import Layout	from './layout';

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
		this.promo_id		= this.props.promo_id;
		this.get_type		= this.props.get_type;
		this.user_data_type	= this.props.user_data_type;
	}

	send_data = async (data) => {
		this.setState({save_state:'waiting'});

		// Отправляем паспортные данные и фотографии
		let passport_data = await settings_request.set_passport_data({
			promo_id:	this.promo_id,
			user_id:	this.props.user.id,
			name:		data.name,
			father:		data.father,
			family:		data.family,
			birthday:	data.birthday+' 00:00:00',
			mail:		data.mail,
			seria:		data.seria,
			number:		data.number,
			date:		data.date+' 00:00:00',
			issuer:		data.issuer,
			inn:		data.inn,
			address:	data.address,
		});
		if(passport_data.response) {
			let obj = {
				name:		data.name,
				father:		data.father,
				family:		data.family,
				mail:		data.mail,
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

			let photos_data = await this.send_photos([data.passport_photo,data.passport_residence,data.inn_photo]);
			if(!photos_data) {
				await alert("Ошибка",address_data.error.message);
				this.setState({save_state:'errored'});
				return;
			}
		}
		if(passport_data.error) {
			await alert("Не удалось отправить данные",error.message);
			this.setState({save_state:'errored'});
			return;
		}

		// ЦВП
		if(this.props.get_type == 1) {
			let center_data = await promo_request.set_prize_center({
				promo_id: this.promo_id,
				user_id: this.props.user.id,
				center: this.props.user.center,
			});
			if(center_data.response) {
			}
			if(center_data.error) {
				await alert("Ошибка",address_data.error.message);
				this.setState({save_state:'errored'});
				return;
			}

		// Доставка
		} else if(this.props.get_type == 2) {
			let address_data = await settings_request.set_delivery_address({
				promo_id: this.promo_id,
				user_id: this.props.user.id,
				...this.props.user.address_obj,
			});
			if(address_data.response) {
			}
			if(address_data.error) {
				await alert("Ошибка",address_data.error.message);
				this.setState({save_state:'errored'});
				return;
			}
		}

		this.setState({save_state:'succeed'});
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
					let image_data = await settings_request.add_passport_photo({
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
				this.setState({error:photo.error});
				await alert("Не удалось загрузить фотографии",photo.error+'\nПопробуйте еще раз');
				return false;
			}
		}

		// Если ошибок нет, то все успешно!
		return true;
	}

	back = () => {
		if(this.state.save_state == 'succeed') this.props.navigation.navigate('promo_my_prizes');
	}

	render() {
		// console.log("Full Passport Data Component",this.props);

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
