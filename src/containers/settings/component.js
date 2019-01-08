import React,{Component} from 'react';
import {Alert,StyleSheet,ScrollView,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Personal		from './personal';
import Profile		from './profile';
import LoyaltyCards	from './loyalty_card_list';
import About		from './about';

import alert		from '../../services/alert';
import st			from '../../services/storage';

import {request}	from '../../redux/reducers/settings';

export default withNavigation(class SettingsComponent extends Component {
	constructor(props) {
		super(props);

		this.scroll = React.createRef();
	}

	set_personal_data = async (data) => {
		this.props.update_user(data);
	}
	save_personal_data = async (data) => {
		this.props.open_smoke();
		// Если он уже вошел, то сохраняем, иначе регистрируем
		if(this.props.user?.id) {
			this.props.update_user(data);
			let {response,error} = await request.save({...this.props.user,...data});
			if(response) {
				st.merge('user',{...this.props.user,...data});

				// Указал или поменял почту
				if(data.mail && !this.props.user.mail_confirmed || data.last_mail != data.mail) {
					let {response,error} = await request.mail_send_code(this.props.user.id);
					if(response) {
						await alert('Изменения сохранены','На почту отправлено письмо подтверждения');
					}
					if(error) {
						// Тут непонятно, что делать
					}
				} else {
					await alert('Изменения сохранены');
				}
			}
			if(error) {
				await alert('Не удалось сохранить изменения');
			}
		} else {
			let {response,error} = await request.register(data);
			if(response) {
				// Записываем его ид, полученный с сервера
				let id = response.user_id;
				this.props.update_user({id});

				// В асинхронное хранилище изменения тоже записываем
				st.merge('user',{...data,id});

				// Отправляем на экран подтверждения телефона
				await alert('Поздравляем, вы успешно зарегистрировались','Подтвердите свой номер телефона');
				this.props.navigation.push('settings_confirm_phone');
			}
			if(error) {
				await alert('Регистрация не удалась',error.message);
			}
		}
		this.props.close_smoke();
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
		console.log("Settings Component",this.state,this.props);

		return (
			<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={{padding:10}}>
				<Personal
					{...this.props}
					scroll={this.scroll}
					update_data={this.set_personal_data}
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
