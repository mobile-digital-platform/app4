import {all,call,put,select,takeEvery,takeLatest} from 'redux-saga/effects';

import config	from '../../../config';
import API		from '../../../services/api';

export const ReducerRecord = () => ({
	data: [],
	error: null,
	initialized: false,
	loading: false,
	loaded: false,
});

// Постоянные
export const module = 'promo_my';

export const REQUEST		= config.name+'/'+module+'/REQUEST';
export const SUCCESS		= config.name+'/'+module+'/SUCCESS';
export const ERROR			= config.name+'/'+module+'/ERROR';

// Редуктор
export default function reducer(st = ReducerRecord(),action) {
	const {type,payload,error} = action;

	if(type == REQUEST) {
		return {...st,loading:true};

	} else if(type == SUCCESS) {
		return {
			...st,
			loading: false,
			loaded: true,
			data: payload.data,
			error: null,
		};

	} else if(type == ERROR) {
		return {
			...st,
			loading: false,
			error,
		};
	}

	return {...st};
}

// Действие
export function get_data(payload) {
	return {
		type: REQUEST,
		payload,
	};
}

// Сага
export const fetch_data_saga = function*({payload}) {
	try {
		let data = {
			id: payload.id,
			title: 'Акция '+Math.ceil(Math.random()*100),
			ending: Math.ceil(Math.random()*20),
			check: [
				{
					id: 1,
					number: '2635 1735 18',
					points: 5,
					timestamp: new Date(1543508931614),
					state: 0,
				},
				{
					id: 2,
					number: '8264 6245 72',
					points: 10,
					timestamp: new Date(1543508931614),
					state: 1,
				},
				{
					id: 3,
					number: '0004 7265 62',
					points: 0,
					timestamp: new Date(1543508931614),
					state: 2,
				},
				{
					id: 4,
					number: '9375 2935 71',
					points: 25,
					timestamp: new Date(1543508931614),
					state: 1,
				},
			],
		};

		yield put({
			type: SUCCESS,
			payload: {
				...payload,
				data,
			},
		});
	} catch (error) {
		console.log('error',error);
		yield put({
			type: ERROR,
			error,
		});
	}
};

export const saga = function*() {
	yield all([
		takeEvery(REQUEST,fetch_data_saga),
	]);
};
