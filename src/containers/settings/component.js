import React,{Component} from 'react';
import {Alert,StyleSheet,ScrollView} from 'react-native';
import {withNavigation} from 'react-navigation';

import Personal		from './personal';
import Profile		from './profile';
import LoyaltyCards	from './loyalty_cards';
import About		from './about';

import alert		from '../../services/alert';
import st			from '../../services/storage';

import {request}	from '../../redux/reducers/settings';

export default withNavigation(class SettingsComponent extends Component {
	constructor(props) {
		super(props);

		this.scroll = React.createRef();

		this.state = {
			personal_data: null,
		};
	}

	async componentDidMount() {
		// this.props.log_out();
		// this.props.navigation.push('settings_authorization');
		// let we = await st.get('user');
		// if(we) {
		// 	if(we.id) {
		// 		this.setState({personal_data:we});
		// 		this.props.update_user(we);
		//
		// 		let {response,error} = await request.get(we.id);
		// 		if(response) {
		// 			// await this.setState({personal_data:response});
		// 			this.props.update_user(response);
		// 			st.set('user',response);
		// 		}
		// 		if(error) {
		// 			// await alert(this.props.registration_state.error.message);
		// 		}
		// 	} else {
		// 		st.set('user',{});
		// 	}
		// }
		// if(this.props.user.id)
		this.setState({personal_data:this.props.user});
	}

	componentDidUpdate(prev_props) {
		if(!Object.is(this.props.user,prev_props.user)) {
			this.setState({personal_data:this.props.user});
		}
	}

	set_personal_data = async (data) => {
		this.props.update_user(data);
	}
	save_personal_data = async (data) => {
		await this.setState(state => ({personal_data:{...state.personal_data,data}}));

		// Если он уже вошел, то сохраняем, иначе регистрируем
		if(this.state.personal_data?.id) {
			this.props.update_user(data);
			let {response,error} = await request.save(this.state.personal_data);
			if(response) {
				st.merge('user',this.state.personal_data);
				await alert('Изменения сохранены');
			}
			if(error) {
				await alert('Не удалось сохранить изменения');
			}
		} else {
			let {response,error} = await request.register(data);
			if(response) {
				// Записываем его ид, полученный с сервера
				let id = response.user_id;
				await this.setState(state => ({personal_data:{...state.personal_data,id}}));
				this.props.update_user({id});
				console.log("STATE",this.state.personal_data);

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
	}

	render() {
		console.log("Settings Component",this.state,this.props);

		return (
			<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={{padding:10}}>
				<Personal
					{...this.props}
					state={this.state}
					scroll={this.scroll}
					update_data={this.set_personal_data}
					send_data={this.save_personal_data}
				/>
				<Profile		{...this.props} state={this.state} log_out={this.props.log_out} />
				{/*<LoyaltyCards	{...this.props} state={this.state} />*/}
				<About			{...this.props} state={this.state} />
			</ScrollView>
		);
	}
});
