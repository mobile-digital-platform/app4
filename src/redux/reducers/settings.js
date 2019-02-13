import {AsyncStorage} from 'react-native';
import {all,call,put,select,takeEvery,takeLatest} from 'redux-saga/effects';

import f 			from '../../functions';
import config		from '../../config';

import API			from '../../services/api';
import storage		from '../../services/storage';
import city			from '../../services/city';

export const ReducerRecord = () => ({
	id:				0,
	phone:			'',
	phone_confirmed:false,
	mail:			'',
	mail_confirmed:	false,
	name:			'',
	father:			'',
	family:			'',
	gender:			'',
	city_id:		0,
	city_name:		'',
	loyalty_card:	[],
	push_token:		'',
	adress:         {},
});

// Постоянные
export const module = 'settings';

export const UPDATE_USER			= config.name+'/'+module+'/UPDATE_USER';
export const ADD_LOYALTY_CARD		= config.name+'/'+module+'/ADD_LOYALTY_CARD';
export const REMOVE_LOYALTY_CARD	= config.name+'/'+module+'/REMOVE_LOYALTY_CARD';
export const LOG_OUT				= config.name+'/'+module+'/LOG_OUT';

// Редуктор
export default function reducer(st = ReducerRecord(),action) {
	const {type,payload,error} = action;
	// console.log("ACTION",type);
	// console.log("STATE",st);

	switch(type) {
		// Установка данных в местное хранилище
		case UPDATE_USER:
			if(payload.phone) payload.phone = (+f.parse_int(payload.phone) || '')+'';
			return {...st,...payload};

		case ADD_LOYALTY_CARD:
			return {
				...st,
				loyalty_card: [...st.loyalty_card,payload],
			};

		case REMOVE_LOYALTY_CARD:
			return {
				...st,
				loyalty_card: st.loyalty_card.filter(e => e.retailer_id!=payload.id),
			};

		case LOG_OUT:
			storage.set('user',{});
			return ReducerRecord();
	}

	return {...st};
}

// Действия
export const update_user			= (payload) => ({type:UPDATE_USER,payload});
export const add_loyalty_card		= (payload) => ({type:ADD_LOYALTY_CARD,payload});
export const remove_loyalty_card	= (payload) => ({type:REMOVE_LOYALTY_CARD,payload});
export const log_out				= (payload) => ({type:LOG_OUT,payload});

// Запросы
export const request = {
	// Регистрация
	register: async (data) => {
		data.push_token = '';
		let {response,error} = await API('/Register',{
			Phone:		f.parse_int(data.phone),
			Name:		data.name,
			MName:		data.father,
			LName:		data.family,
			Gender:		data.gender || 1,
			Email:		data.mail,
			City:		data.city_id,
			PushToken:	data.push_token,
		});
		if(response) {
			return {response:{user_id:response.UserID}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Вход
	authorize: async (data) => {
		let {response,error} = await API('/Authorize',{Phone:f.parse_int(data.phone),Password:data.password});
		if(response) {
			return {response:{user_id:response.UserID}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Получение данных
	get: async (id) => {
		let {response,error} = await API('/UserDataGet',{UserID:id});
		if(response) {
			return {response:{
				id,
				phone:				f.parse_int(response.Phone),
				phone_confirmed:	!!response.PhoneConfirmed,
				mail:				response.Email,
				mail_confirmed:		!!response.EmailConfirmed,
				name:				response.Name,
				father:				response.MName,
				family:				response.LName,
				gender:				response.Gender,
				city_id:			response.City,
				city_name:			city.find_city(response.City),
				loyalty_card:		response.Cards.map(e => ({
					retailer_id:		e.NetworkID,
					number:				e.CardNum,
				})),
				push_token:			response.PushToken,
			}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Сохранение данных
	save: async (data) => {
		let {response,error} = await API('/UserDataEdit',{
			UserID:	data.id,
			Name:	data.name,
			MName:	data.father,
			LName:	data.family,
			Gender:	data.gender,
			Email:	data.mail,
			City:	data.city_id,
		});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Запрос пароля
	phone_send_password: async (phone) => {
		let {response,error} = await API('/PhoneSendPassword',{Phone:f.parse_int(phone)});
		if(response) {
			return {response:{code:response.Code}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Запрос кода подтверждения
	phone_send_code: async (id) => {
		let {response,error} = await API('/PhoneSendCode',{UserID:id});
		if(response) {
			return {response:{code:response.Code}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Подтверждение номера телефона
	phone_confirm: async (data) => {
		let {response,error} = await API('/PhoneConfirm',{UserID:data.user_id,Code:data.code});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Запрос письма подтверждения
	mail_send_code: async (id) => {
		let {response,error} = await API('/MailSendCode',{UserID:id});
		if(response) {
			return {response:{code:response.Code}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Подтверждение почты
	mail_confirm: async (data) => {
		let {response,error} = await API('/EmailConfirm',{UserID:data.user_id,Code:data.code});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Добавление карты лояльности
	add_loyalty_card: async (data) => {
		let {response,error} = await API('/AddLoyalityCard',{
			UserID: data.user_id,
			NetworkID: data.retailer_id,
			CardNum: data.number,
		});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Удаление карты лояльности
	remove_loyalty_card: async (data) => {
		let {response,error} = await API('/DeleteLoyalityCard',{UserID:data.user_id,NetworkID:data.retailer_id});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
};

export const saga = function*() {}
