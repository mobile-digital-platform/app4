import {all,call,put,select,takeEvery,takeLatest} from 'redux-saga/effects';

import config	from '../../../config';
import API		from '../../../services/api';

export const ReducerRecord = () => ({
	data: {},
	error: null,
	initialed: false,
	loading: false,
	loaded: false,
});

// Постоянные
export const module = 'settings_change_password';

export const REQUEST		= config.name+'/'+module+'/REQUEST';
export const SUCCESS		= config.name+'/'+module+'/SUCCESS';
export const ERROR			= config.name+'/'+module+'/ERROR';

// Редуктор
export default function reducer(st = ReducerRecord(),action) {
	const {type,payload,error} = action;

	if(type == REQUEST) {
		return {...st,loading:true};

	} else if(type == SUCCESS) {
		let data = [];
		if(payload.next)		data = [...st.data,...payload.data];
		else if(payload.new)	data = [...payload.data,...st.data];

		return {
			...st,
			loading: false,
			loaded: true,
			data,
			error: null,
		};

	} else if(type == ERROR) {
		return {
			...st,
			loading: false,
			error,
		};
		// st.loaded = false;
	}

	return {...st};
}

// Действие
export function send_data(payload) {
	return {
		type: REQUEST,
		payload,
	};
}

// Сага
export const send_data_saga = function*({payload}) {
	console.log(payload);
	let {response,error} = yield call(API('/UserDataEdit',{
		UserID:	payload.id,
		Name:	payload.name,
		MName:	payload.father,
		LName:	payload.family,
		Gender:	payload.gender,
		Email:	payload.mail,
		City:	payload.city,
	}));
	if(response) {
		yield put({
			type: SUCCESS,
			payload: {
				...payload,
				data: response,
			}
		});
	}
	if(error) {
		console.log('error',error);
		yield put({
			type: ERROR,
			error,
		});
	}
};

export const saga = function*() {
	yield all([
		takeEvery(REQUEST,send_data_saga),
	]);
};
