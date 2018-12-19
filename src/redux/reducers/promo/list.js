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
export const module = 'promo_list';

export const REQUEST		= config.name+'/'+module+'/REQUEST';
export const SUCCESS		= config.name+'/'+module+'/SUCCESS';
export const ERROR			= config.name+'/'+module+'/ERROR';

// Редуктор
export default function reducer(st = ReducerRecord(),action) {
	const {type,payload,error} = action;

	if(type == REQUEST) {
		return {...st,loading:true};

	} else if(type == SUCCESS) {
		let items = payload.data.map(e => ({
			id:			e.PromoGroupID,
			title:		e.PromoGroupName,
			start:		e.Start.substr(0,10),
			end:		e.Finish.substr(0,10),
			image_url:	e.BannerLink,
		}));
		let data = [];
		// if(payload.next)		data = [...st.data,...items];
		// else if(payload.new)	data = [...items,...st.data];
		data = items;

		return {
			...st,
			data,
			error: null,
			initialized: true,
			loading: false,
			loaded: true,
		};

	} else if(type == ERROR) {
		return {
			...st,
			error,
			initialized: true,
			loading: false,
		};
	}

	return {...st};
}

// Действия
export const get_data = (payload) => ({type:REQUEST,payload});

// Сага
export const fetch_data_saga = function*({payload}) {
	// let data = [];
	// for(let i=0; i<10; i++) data.push({
	// 	title: 'Акция '+Math.ceil(Math.random()*10*(i+1)),
	// 	ending: Math.ceil(Math.random()*20),
	// });
	let {response,error} = yield call(API,'/PromoGroupList');
	yield new Promise(resolve => setTimeout(resolve,1000));
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
		takeEvery(REQUEST,fetch_data_saga),
	]);
};
