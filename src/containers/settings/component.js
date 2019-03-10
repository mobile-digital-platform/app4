import React,{Component} from 'react';
import {Alert,StyleSheet,ScrollView,View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {withNavigation} from 'react-navigation';

import Personal		from './personal';
import Profile		from './profile';
import LoyaltyCards	from './loyalty_card_list';
import About		from './about';

import alert		from '../../services/alert';
import st			from '../../services/storage';
import push			from '../../services/push_notification';

import {request}	from '../../redux/reducers/settings';

export default withNavigation(class SettingsComponent extends Component {
	constructor(props) {
		super(props);

		this.scroll = React.createRef();

		this.state = {
			save_state: 'initial',
		}
	}

	// Когда зарегистрировался или вошел
	componentDidUpdate(prev_props) {
		console.log(prev_props.user.id,this.props.user.id);
		if(prev_props.user.id != this.props.user.id && this.props.user.id) {
			PushNotification.configure({
				onRegister: ({token}) => {
					console.log('TOKEN:',token);
					if(this.props.user.push_token != token) {
						request.save({...this.props.user,push_token:token});
						this.props.update_user({push_token:token});
					}
				},
				requestPermissions: true,
			});
		}
	}

	save_personal_data = async (data) => {
		// this.props.open_smoke();
		this.setState({save_state:'waiting'});
		// Если он уже вошел, то сохраняем
		if(this.props.user?.id) {
			this.props.update_user(data);
			let {response,error} = await request.save({...this.props.user,...data});
			if(response) {
				st.merge('user',{...this.props.user,...data});

				// === Пока убрано === \\

				// Указал или поменял почту
				// if(data.mail && !this.props.user.mail_confirmed || data.last_mail != data.mail) {
				// 	let {response,error} = await request.mail_send_code(this.props.user.id);
				// 	if(response) {
				// 		this.setState({save_state:'succeed'});
				// 		await alert('Изменения сохранены','На почту отправлено письмо подтверждения');
				// 	}
				// 	if(error) {
				// 		// Тут непонятно, что делать
				// 		this.setState({save_state:'errored'});
				// 		await alert('Не удалось отправить письмо на почту для подтверждения');
				// 	}
				// } else {
					this.setState({save_state:'succeed'});
					// await alert('Изменения сохранены');
				// }
			}
			if(error) {
				this.setState({save_state:'errored'});
				await alert('Не удалось сохранить изменения');
			}

		// Регистрируем
		} else {
			let {response,error} = await request.register(data);
			if(response) {
				// Записываем его ид, полученный с сервера
				let id = response.user_id;
				this.props.update_user({id});

				// Записываем токен
				if(!config.simulator) {
					let push_token = await push.request_async();
					if(data.push_token != push_token) {
						data.push_token = push_token;
						settings_request.save({...data,id});
					}
				}

				// В асинхронное хранилище изменения тоже записываем
				st.merge('user',{...data,id});

				this.setState({save_state:'succeed'});

				// Отправляем на экран подтверждения телефона
				await alert('Поздравляем, вы успешно зарегистрировались','Подтвердите свой номер телефона');
				this.props.navigation.push('settings_confirm_phone');
			}
			if(error) {
				this.setState({save_state:'errored'});
				await alert('Регистрация не удалась',error.message);
			}
		}
		// this.props.close_smoke();
	}

	remove_loyalty_card = async (id) => {
		this.props.open_smoke();
		let {response,error} = await request.remove_loyalty_card({
			user_id:		this.props.user.id,
			retailer_id:	id,
		});
		if(response) {
			this.props.remove_loyalty_card({id});
		}
		if(error) {
			await alert('Не вышло удалить карту',error.message);
		}
		this.props.close_smoke();
	}

	render() {
		// console.log("Settings Component",this.state,this.props);

		return (
			<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={{padding:10}}>
				<Personal
					{...this.props}
					scroll={this.scroll}
					state={this.state.save_state}
					update_data={this.props.update_user}
					send_data={this.save_personal_data}
				/>
				{/*
				*/}
				<Profile		{...this.props} log_out={this.props.log_out} />
				{this.props.user.id ? (<LoyaltyCards {...this.props} remove={this.remove_loyalty_card} />) : null}
				<About			{...this.props} />
			</ScrollView>
		);
	}
});
