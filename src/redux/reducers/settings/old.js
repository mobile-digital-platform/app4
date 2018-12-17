import {AsyncStorage} from 'react-native';
import {all,call,put,select,takeEvery,takeLatest} from 'redux-saga/effects';

import config			from '../../../config';
import API				from '../../../services/api';
import st				from '../../../services/storage';
import get_push_token	from '../../../services/push_token';

export const UserRecord = () => ({
	id:				0,
	phone:			'791734545606',
	phone_confirmed:false,
	mail:			'',
	mail_confirmed:	false,
	name:			'Марина',
	father:			'',
	family:			'',
	gender:			'',
	city_id:		33094,
	city_name:		"Уфа",
	push_token:		'',
});

export const SectionRecord = () => ({
	fetching: false,
	success: true,
	message: '',
	error: null,
});

export const ReducerRecord = () => ({
	user:						UserRecord(),
	registration_state:			SectionRecord(),
	authorization_state:		SectionRecord(),
	get_personal_data_state:	SectionRecord(),
	save_personal_data_state:	SectionRecord(),
	phone_send_code_state:		SectionRecord(),
	phone_confirm_state:		SectionRecord(),
	change_password_state:		SectionRecord(),
	last_action:				null,
});

// Постоянные

export const module = 'settings';

// Регистрация
export const REGISTRATION_REQUEST		= config.name+'/'+module+'/REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS		= config.name+'/'+module+'/REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR			= config.name+'/'+module+'/REGISTRATION_ERROR';
export const REGISTRATION_REMOVE		= config.name+'/'+module+'/REGISTRATION_REMOVE';

// Авторизация
export const AUTHORIZATION_REQUEST		= config.name+'/'+module+'/AUTHORIZATION_REQUEST';
export const AUTHORIZATION_SUCCESS		= config.name+'/'+module+'/AUTHORIZATION_SUCCESS';
export const AUTHORIZATION_ERROR		= config.name+'/'+module+'/AUTHORIZATION_ERROR';
export const AUTHORIZATION_REMOVE		= config.name+'/'+module+'/AUTHORIZATION_REMOVE';

// Получение и установка данных в местное хранилище
export const SET_PERSONAL				= config.name+'/'+module+'/SET_PERSONAL';

// Получение и сохранение данных в асинхронное хранилище
export const GET_FROM_STORAGE			= config.name+'/'+module+'/GET_FROM_STORAGE';
export const GET_FROM_STORAGE_SUCCESS	= config.name+'/'+module+'/GET_FROM_STORAGE_SUCCESS';
export const GET_FROM_STORAGE_ERROR		= config.name+'/'+module+'/GET_FROM_STORAGE_ERROR';

export const SAVE_TO_STORAGE			= config.name+'/'+module+'/SAVE_TO_STORAGE';
export const SAVE_TO_STORAGE_SUCCESS	= config.name+'/'+module+'/SAVE_TO_STORAGE_SUCCESS';
export const SAVE_TO_STORAGE_ERROR		= config.name+'/'+module+'/SAVE_TO_STORAGE_ERROR';

// Получение данных
export const GET_PERSONAL_REQUEST		= config.name+'/'+module+'/GET_PERSONAL_REQUEST';
export const GET_PERSONAL_SUCCESS		= config.name+'/'+module+'/GET_PERSONAL_SUCCESS';
export const GET_PERSONAL_ERROR			= config.name+'/'+module+'/GET_PERSONAL_ERROR';
export const GET_PERSONAL_REMOVE		= config.name+'/'+module+'/GET_PERSONAL_REMOVE';

// Изменение данных
export const SAVE_PERSONAL_REQUEST		= config.name+'/'+module+'/SAVE_PERSONAL_REQUEST';
export const SAVE_PERSONAL_SUCCESS		= config.name+'/'+module+'/SAVE_PERSONAL_SUCCESS';
export const SAVE_PERSONAL_ERROR		= config.name+'/'+module+'/SAVE_PERSONAL_ERROR';
export const SAVE_PERSONAL_REMOVE		= config.name+'/'+module+'/SAVE_PERSONAL_REMOVE';

// Смена пользователя
export const LOG_OUT					= config.name+'/'+module+'/LOG_OUT';

// Запрос подтверждения телефона
export const PHONE_SEND_CODE_REQUEST	= config.name+'/'+module+'/PHONE_SEND_CODE_REQUEST';
export const PHONE_SEND_CODE_SUCCESS	= config.name+'/'+module+'/PHONE_SEND_CODE_SUCCESS';
export const PHONE_SEND_CODE_ERROR		= config.name+'/'+module+'/PHONE_SEND_CODE_ERROR';
export const PHONE_SEND_CODE_REMOVE		= config.name+'/'+module+'/PHONE_SEND_CODE_REMOVE';

// Подтверждение телефона
export const PHONE_CONFIRM_REQUEST		= config.name+'/'+module+'/PHONE_CONFIRM_REQUEST';
export const PHONE_CONFIRM_SUCCESS		= config.name+'/'+module+'/PHONE_CONFIRM_SUCCESS';
export const PHONE_CONFIRM_ERROR		= config.name+'/'+module+'/PHONE_CONFIRM_ERROR';
export const PHONE_CONFIRM_REMOVE		= config.name+'/'+module+'/PHONE_CONFIRM_REMOVE';

// Смена пароля
export const CHANGE_PASSWORD_REQUEST	= config.name+'/'+module+'/CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS	= config.name+'/'+module+'/CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_ERROR		= config.name+'/'+module+'/CHANGE_PASSWORD_ERROR';
export const CHANGE_PASSWORD_REMOVE		= config.name+'/'+module+'/CHANGE_PASSWORD_REMOVE';

// Редуктор
export default function reducer(st = ReducerRecord(),action) {
	const {type,payload,error} = action;
	console.log("ACTION",type);
	console.log("STATE",st.user);

	switch(type) {
		// Регистрация
		case REGISTRATION_REQUEST:		return {...st,registration_state:{...st.registration_state,fetching:true}};
 		case REGISTRATION_SUCCESS:		return {...st,registration_state:{fetching:false,success:true,	error:null},last_action:'registration'};
		case REGISTRATION_ERROR:		return {...st,registration_state:{fetching:false,success:false,	error},		last_action:'registration'};
		case REGISTRATION_REMOVE:		return {...st,registration_state:{...st.registration_state,		error:null},last_action:''};

		// Авторизация
		case AUTHORIZATION_REQUEST:		return {...st,authorization_state:{...st.authorization_state,fetching:true}};
 		case AUTHORIZATION_SUCCESS:		return {...st,authorization_state:{fetching:false,success:true,	error:null},last_action:'authorization'};
		case AUTHORIZATION_ERROR:		return {...st,authorization_state:{fetching:false,success:false,error},		last_action:'authorization'};
		case AUTHORIZATION_REMOVE:		return {...st,authorization_state:{...st.authorization_state,	error:null},last_action:''};

		// Установка данных в местное хранилище
		case SET_PERSONAL:				return {...st,user:{...st.user,...payload},last_action:'set_personal'};

		// Получение и сохранение данных в асинхронное хранилище
		case GET_FROM_STORAGE:
		case GET_FROM_STORAGE_SUCCESS:	return {...st,user:{...st.user,...payload},last_action:'get_from_storage'};
		case GET_FROM_STORAGE_ERROR:	return {...st,last_action:'get_from_storage'};
		case SAVE_TO_STORAGE:
		case SAVE_TO_STORAGE_SUCCESS:	return {...st,last_action:'save_to_storage'};
		case SAVE_TO_STORAGE_ERROR:		return {...st,last_action:'save_to_storage'};

		// Получение данных
		case GET_PERSONAL_REQUEST:		return {...st,get_personal_data_state:{...st.get_personal_data_state,fetching:true}};
 		case GET_PERSONAL_SUCCESS:		return {...st,get_personal_data_state:{fetching:false,success:true,		error:null},last_action:'get_personal_data'};
		case GET_PERSONAL_ERROR:		return {...st,get_personal_data_state:{fetching:false,success:false,	error},		last_action:'get_personal_data'};
		case GET_PERSONAL_REMOVE:		return {...st,get_personal_data_state:{...st.get_personal_data_state,	error:null},last_action:''};

		// Изменение данных
		case SAVE_PERSONAL_REQUEST:		return {...st,save_personal_data_state:{...st.save_personal_data_state,fetching:true}};
 		case SAVE_PERSONAL_SUCCESS:		return {...st,save_personal_data_state:{fetching:false,success:true,	error:null},last_action:'save_personal_data'};
		case SAVE_PERSONAL_ERROR:		return {...st,save_personal_data_state:{fetching:false,success:false,	error},		last_action:'save_personal_data'};
		case SAVE_PERSONAL_REMOVE:		return {...st,save_personal_data_state:{...st.save_personal_data_state,	error:null},last_action:''};

		case LOG_OUT:
			AsyncStorage.setItem('user','{}');
			return ReducerRecord();

		// Запрос подтверждения телефона
		case PHONE_SEND_CODE_REQUEST:	return {...st,phone_send_code_state:{...st.phone_send_code_state,fetching:true}};
 		case PHONE_SEND_CODE_SUCCESS:	return {...st,phone_send_code_state:{fetching:false,success:true,	error:null},	last_action:'phone_send_code'};
		case PHONE_SEND_CODE_ERROR:		return {...st,phone_send_code_state:{fetching:false,success:false,	error},			last_action:'phone_send_code'};
		case PHONE_SEND_CODE_REMOVE:	return {...st,phone_send_code_state:{...st.phone_send_code_state,	error:null},	last_action:''};

		// Подтверждение телефона
		case PHONE_CONFIRM_REQUEST:		return {...st,phone_confirm_state:{...st.phone_confirm_state,fetching:true}};
 		case PHONE_CONFIRM_SUCCESS:		return {...st,phone_confirm_state:{fetching:false,success:true,		error:null},	last_action:'phone_confirm'};
		case PHONE_CONFIRM_ERROR:		return {...st,phone_confirm_state:{fetching:false,success:false,	error},			last_action:'phone_confirm'};
		case PHONE_CONFIRM_REMOVE:		return {...st,phone_confirm_state:{...st.phone_confirm_state,		error:null},	last_action:''};

		// Смена пароля
		case CHANGE_PASSWORD_REQUEST:	return {...st,change_password_state:{...st.change_password_state,fetching:true}};
 		case CHANGE_PASSWORD_SUCCESS:	return {...st,change_password_state:{fetching:false,success:true,	error:null},	last_action:'change_password'};
		case CHANGE_PASSWORD_ERROR:		return {...st,change_password_state:{fetching:false,success:false,	error},			last_action:'change_password'};
		case CHANGE_PASSWORD_REMOVE:	return {...st,change_password_state:{...st.change_password_state,	error:null},	last_action:''};
	}

	return {...st};
}

// Действия
export const register							= (payload) => ({type:REGISTRATION_REQUEST,		payload});
export const authorize							= (payload) => ({type:AUTHORIZATION_REQUEST,	payload});
export const set_personal						= (payload) => ({type:SET_PERSONAL,				payload});
export const get_personal_data					= (payload) => ({type:GET_PERSONAL_REQUEST,		payload});
export const save_personal_data					= (payload) => ({type:SAVE_PERSONAL_REQUEST,	payload});
export const log_out							= (payload) => ({type:LOG_OUT});
export const phone_send_code					= (payload) => ({type:PHONE_SEND_CODE_REQUEST,	payload});
export const phone_confirm						= (payload) => ({type:PHONE_CONFIRM_REQUEST,	payload});
export const change_password					= (payload) => ({type:CHANGE_PASSWORD_REQUEST,	payload});

export const remove_registration_error			= (payload) => ({type:REGISTRATION_REMOVE});
export const remove_authorization_error			= (payload) => ({type:AUTHORIZATION_REMOVE});
export const remove_get_personal_data_error		= (payload) => ({type:GET_PERSONAL_REMOVE});
export const remove_save_personal_data_error	= (payload) => ({type:SAVE_PERSONAL_REMOVE});
export const remove_phone_send_code_error		= (payload) => ({type:PHONE_SEND_CODE_REMOVE});
export const remove_phone_confirm_error			= (payload) => ({type:PHONE_CONFIRM_REMOVE});
export const remove_change_password_error		= (payload) => ({type:CHANGE_PASSWORD_REMOVE});

// Саги

// Регистрация
export const register_saga			= function*({payload}) {
	payload.push_token = (yield call(get_push_token)) ?? '';
	let {response,error} = yield call(API,'/Register',{
		Phone:		payload.phone,
		Name:		payload.name,
		MName:		payload.father,
		LName:		payload.family,
		Gender:		payload.gender,
		Email:		payload.mail,
		City:		payload.city_id,
		PushToken:	payload.push_token,
	});
	if(response) {
		let id = response.UserID;
		yield put({type:SET_PERSONAL,payload:{id}});
		yield put({type:SAVE_TO_STORAGE,payload:{...payload,id}});
		yield put({type:REGISTRATION_SUCCESS});
	}
	if(error) {
		console.log('error',error);
		yield put({type:REGISTRATION_ERROR,error});
	}
}
// Авторизация
export const authorize_saga			= function*({payload}) {
	let {response,error} = yield call(API('/Authorize',{
		Phone:		payload.phone,
		Password:	payload.password,
	}));
	if(response) {
		yield put({type:SET_PERSONAL,payload:{id:response.UserID}});
		yield put({type:AUTHORIZATION_SUCCESS});
	}
	if(error) {
		console.log('error',error);
		yield put({type:AUTHORIZATION_ERROR,error});
	}
}
// Установка данных в местное хранилище
export const set_personal_saga		= function*({payload}) {
	console.log('SET_PERSONAL',payload);
	try {
		let user_data = JSON.parse(yield call(AsyncStorage.getItem,'user')) ?? {};
		yield call(AsyncStorage.setItem,'user',JSON.stringify(Object.assign(user_data,payload)));
	} catch (e) {
		console.log(e);
	}
}
// Получение и сохранение данных в асинхронное хранилище
export const get_from_storage_saga	= function*({payload}) {
	try {
		let payload = JSON.parse(yield call(AsyncStorage.getItem,'user')) ?? {};
		yield put({type:GET_FROM_STORAGE_SUCCESS,payload});
	} catch (e) {
		console.log(e);
		yield put({type:GET_FROM_STORAGE_ERROR});
	}
}
export const save_to_storage_saga	= function*({payload}) {
	try {
		let user_data = JSON.parse(yield call(AsyncStorage.getItem,'user')) ?? {};
		yield call(AsyncStorage.setItem,'user',JSON.stringify(Object.assign(user_data,payload)));
		yield put({type:SAVE_TO_STORAGE_SUCCESS});
	} catch (e) {
		console.log(e);
		yield put({type:SAVE_TO_STORAGE_ERROR});
	}
}
// Получение данных с сервера
export const get_personal_saga		= function*({payload}) {
	let {response,error} = yield call(API,'/UserDataGet',{UserID:payload});
	if(response) {
		yield put({type:GET_PERSONAL_SUCCESS});
		yield put({
			type: SET_PERSONAL,
			payload: {
				phone:				response.Phone,
				phone_confirmed:	response.PhoneConfirmed,
				mail:				response.Email,
				mail_confirmed:		response.EmailConfirmed,
				name:				response.Name,
				father:				response.MName,
				family:				response.LName,
				gender:				response.Gender,
				city:				response.City,
				push_token:			response.PushToken,
			},
		});
	}
	if(error) {
		console.log('error',error);
		yield put({type:GET_PERSONAL_ERROR,error});
	}
}
// Сохранение данных на сервер
export const save_personal_saga		= function*({payload,...props}) {
	console.log("PROPS",props);
	// Сюда должны приходить данные уже из хранилища
	let {response,error} = yield call(API,'/UserDataEdit',{
		UserID:	payload.id,
		Name:	payload.name,
		MName:	payload.father,
		LName:	payload.family,
		Gender:	payload.gender,
		City:	payload.city,
	});
	if(response) yield put({type:SAVE_PERSONAL_SUCCESS});
	if(error) {
		console.log('error',error);
		yield put({type:SAVE_PERSONAL_ERROR,error});
	}
}
// Запрос кода по смс
export const phone_send_code_saga	= function*({payload}) {
	let {response,error} = yield call(API,'/PhoneSendCode',{UserID:payload.user_id});

	console.log(response);
	if(response) yield put({type:PHONE_SEND_CODE_SUCCESS});
	if(error) {
		console.log('error',error);
		yield put({
			type: PHONE_SEND_CODE_ERROR,
			error,
		});
	}
}
// Подтверждение кода по смс
export const phone_confirm_saga		= function*({payload}) {
	let {response,error} = yield call(API,'/PhoneConfirm',{
		UserID:	payload.user_id,
		Code:	payload.code,
	});
	if(response) {
		yield put({type:SET_PERSONAL,payload:{phone_confirmed:true}});
		yield put({type:PHONE_CONFIRM_SUCCESS});
	}
	if(error) {
		console.log('error',error);
		yield put({
			type: PHONE_CONFIRM_ERROR,
			error,
		});
	}
}
// Смена пароля
export const change_password_saga	= function*({payload}) {
	// let {response,error} = yield call(API,'/Authorize',{
	// 	Phone:		payload.phone,
	// 	Password:	payload.password,
	// });
	if(response) {
		yield put({type:CHANGE_PASSWORD_SUCCESS});
	}
	if(error) {
		console.log('error',error);
		yield put({
			type: CHANGE_PASSWORD_ERROR,
			error,
		});
	}
}

export const saga = function*() {
	yield all([
		takeLatest(REGISTRATION_REQUEST,	register_saga),
		takeLatest(AUTHORIZATION_REQUEST,	authorize_saga),
		// takeEvery (SET_PERSONAL,			set_personal_saga),
		takeLatest(GET_FROM_STORAGE,		get_from_storage_saga),
		takeLatest(SAVE_TO_STORAGE,			save_to_storage_saga),
		takeLatest(GET_PERSONAL_REQUEST,	get_personal_saga),
		takeLatest(SAVE_PERSONAL_REQUEST,	save_personal_saga),
		takeLatest(PHONE_SEND_CODE_REQUEST,	phone_send_code_saga),
		takeLatest(PHONE_CONFIRM_REQUEST,	phone_confirm_saga),
		takeLatest(CHANGE_PASSWORD_REQUEST,	change_password_saga),
	]);
}
