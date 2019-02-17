import React,{Component} from 'react';
import {ImageStore} from 'react-native';
import {withNavigation} from 'react-navigation';

import f from '../../../functions';

import alert from '../../../services/alert';

import {request} from '../../../redux/reducers/promo';

import Layout from './layout';

export default withNavigation(class PromoAddCheckComponent extends Component {
	constructor(props) {
		super(props);

		this.promo_id = props.navigation.getParam('id',0);

		this.state = {
			check_id: '',
			photo_list: [
				{state:0,error:''},
				{state:0,error:''},
				{state:0,error:''},
			],
			error: '',
			save_state: 'initial',
		}
	}

	send_data = async (data) => {
		console.log(data);

		this.setState({save_state:'waiting'});

		// Загружаем чек, если до этого не загружали или поменялись данные
		if(data.updated || !this.state.check_id) {
			let check_data = await request.add_check_data({
				user_id:	this.props.user.id,
				promo_id:	this.promo_id,
				// datetime:	f.date("Y-m-d H:i:s",data.datetime)+'.000',
				datetime:	f.date("Y-m-d",data.datetime)+'T'+f.date("H:i:s",data.datetime)+'.000Z',
				sum:		data.sum,
				fn:			data.fn,
				fd:			data.fd,
				fp:			data.fp,
			});
			if(check_data.response) {
				let {check_id} = check_data.response;
				await this.setState({check_id});
			}
			if(check_data.error) {
				this.setState({save_state:'errored'});
				await alert("Не удалось загрузить данные о чеке",check_data.error.message);
				return;
			}
		}
		await this.send_photos(data);
	}

	send_photos = async (data) => {
		let {check_id,photo_list} = this.state;

		// Загружаем все фотографии, которые еще не были загружены
		let waiting = [];
		for(let i=0; i<data.photo_list.length; i++) {
			let photo = data.photo_list[i];

			console.log(photo_list[i]);
			// Если она еще не загружена успешно, то загружаем
			if(photo_list[i].state != 1) {
				waiting.push(new Promise(async (resolve) => {
					let image_data = await request.add_check_photo({
						user_id: this.props.user.id,
						promo_id: this.promo_id,
						check_id,
						file: photo.base64,
					});
					console.log(i,image_data);
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
		if(this.state.save_state == 'succeed') this.props.navigation.goBack();
	}

	render() {
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
