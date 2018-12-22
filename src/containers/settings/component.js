import React,{Component} from 'react';
import {Alert,StyleSheet,ScrollView} from 'react-native';
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
		// Если он уже вошел, то сохраняем, иначе регистрируем
		if(this.props.user?.id) {
			this.props.update_user(data);
			this.props.open_smoke();
			let {response,error} = await request.save({...this.props.user,...data});
			if(response) {
				st.merge('user',{...this.props.user,...data});
				await alert('Изменения сохранены');
			}
			if(error) {
				await alert('Не удалось сохранить изменения');
			}
			this.props.close_smoke();
		} else {
			this.props.open_smoke();
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
			this.props.close_smoke();
		}
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
				<Profile		{...this.props} log_out={this.props.log_out} />
				{/*
				<LoyaltyCards	{...this.props} />
				*/}
				<About			{...this.props} />
			</ScrollView>
		);
	}
});
