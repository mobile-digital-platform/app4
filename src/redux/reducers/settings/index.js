import {AsyncStorage} from 'react-native';
import {all,call,put,select,takeEvery,takeLatest} from 'redux-saga/effects';

import config			from '../../../config';
import API				from '../../../services/api';
import storage			from '../../../services/storage';
import city				from '../../../services/city';
// import get_push_token	from '../../../services/push_token';

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
	push_token:		'',
});

// Постоянные
export const module = 'settings';

export const UPDATE_USER				= config.name+'/'+module+'/UPDATE_USER';
export const LOG_OUT					= config.name+'/'+module+'/LOG_OUT';

// Редуктор
export default function reducer(st = ReducerRecord(),action) {
	const {type,payload,error} = action;
	console.log("ACTION",type);
	console.log("STATE",st);

	switch(type) {
		// Установка данных в местное хранилище
		case UPDATE_USER: return {...st,...payload};

		case LOG_OUT:
			storage.set('user',{});
			return ReducerRecord();
	}

	return {...st};
}

// Действия
export const update_user	= (payload) => ({type:UPDATE_USER,payload});
export const log_out		= (payload) => ({type:LOG_OUT,payload});

// Запросы
export const request = {
	register: async (data) => {
		// data.push_token = (await get_push_token()) ?? '';
		let {response,error} = await API('/Register',{
			Phone:		data.phone,
			Name:		data.name,
			MName:		data.father,
			LName:		data.family,
			Gender:		data.gender,
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
	authorize: async (data) => {
		let {response,error} = await API('/Authorize',{Phone:data.phone,Password:data.password});
		if(response) {
			return {response:{user_id:response.UserID}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	get: async (id) => {
		let {response,error} = await API('/UserDataGet',{UserID:id});
		if(response) {
			return {response:{
				id,
				phone:				response.Phone,
				phone_confirmed:	!!response.PhoneConfirmed,
				mail:				response.Email,
				mail_confirmed:		!!response.EmailConfirmed,
				name:				response.Name,
				father:				response.MName,
				family:				response.LName,
				gender:				response.Gender,
				city_id:			response.City,
				city_name:			city.find_city(response.City),
				push_token:			response.PushToken,
			}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	save: async (data) => {
		let {response,error} = await API('/UserDataEdit',{
			UserID:	data.id,
			Name:	data.name,
			MName:	data.father,
			LName:	data.family,
			Gender:	data.gender,
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
};

export const saga = function*() {}

/*

// Регистрация
export const register_request			= async (data) => {
	data.push_token = (await get_push_token()) ?? '';
	return await API('/Register',{
		Phone:		data.phone,
		Name:		data.name,
		MName:		data.father,
		LName:		data.family,
		Gender:		data.gender,
		Email:		data.mail,
		City:		data.city_id,
		PushToken:	data.push_token,
	});
}
// Авторизация
export const authorize_request			= async (data) => await API('/Authorize',{Phone:data.phone,Password:data.password}));
// Получение данных с сервера
export const get_personal_request		= async (id)   => await API('/UserDataGet',{UserID:id});
// Сохранение данных на сервер
export const save_personal_request		= async (data) => {
	return await API('/UserDataEdit',{
		UserID:	data.id,
		Name:	data.name,
		MName:	data.father,
		LName:	data.family,
		Gender:	data.gender,
		City:	data.city,
	});
}
// Запрос кода по смс
export const phone_send_code_request	= async (id)   => await API('/PhoneSendCode',{UserID:id});
// Подтверждение кода по смс
export const phone_confirm_request		= async (data) => await API('/PhoneConfirm',{UserID:data.user_id,Code:data.code});
*/
