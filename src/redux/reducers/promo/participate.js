import {all,call,put,select,takeEvery,takeLatest} from 'redux-saga/effects';

import config	from '../../../config';
import API		from '../../../services/api';

export const ReducerRecord = () => ({
	data: false,
	error: null,
	initialized: false,
	loading: false,
	loaded: false,
});

// Постоянные
export const module = 'promo_view';

export const SET			= config.name+'/'+module+'/SET';
export const REQUEST		= config.name+'/'+module+'/REQUEST';
export const SUCCESS		= config.name+'/'+module+'/SUCCESS';
export const ERROR			= config.name+'/'+module+'/ERROR';

// Редуктор
export default function reducer(st = ReducerRecord(),action) {
	const {type,payload,error} = action;

	switch(type) {
		case SET:		return {...st,data:payload};
	 	case REQUEST:	return {...st,loading:true};
 		case SUCCESS:
			let retailer = payload.data.map(e => ({
				// id:			e.PromoID,
				// group_id:	e.PromoGroupID,
				// title:		e.PromoGroupName,
				id:				e.NetworkID,
				name:			e.NetworkName,
				description:	e.Description,
				start:			new Date(e.Start),
				end:			new Date(e.Finish),
				image_url:		e.BannerLink,
				link:			e.WebSiteLink,
				active:			e.IsActive,
			})).filter(e => e.active);

			return {
				...st,
				data: {
					...st.data,
					retailer,
				},
				error: null,
				loading: false,
				loaded: true,
			};
	 	case ERROR:		return {
			...st,
			error,
			loading: false,
		};
	}

	return {...st};
}

// Действие
export const set_data		= (payload) => ({type:SET,payload});
export const get_retailers	= (payload) => ({type:REQUEST,payload});

// Сага
export const fetch_data_saga = function*({payload}) {
	// let data = {
	// 	id: payload.id,
	// 	title: 'Акция '+Math.ceil(Math.random()*100),
	// 	ending: Math.ceil(Math.random()*20),
	// 	description: 'Описание условий акции описание условий акции описание условий акции описание условий акции',
	// 	retailer: [
	// 		{
	// 			id: 1,
	// 			name: 'Ашан',
	// 			link: 'ссылка на промо сайт',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Пятерочка',
	// 			link: 'ссылка на промо сайт',
	// 		},
	// 	],
	// };
	let {response,error} = yield call(API,'/PromoList',{PromoGroupID:payload});
	if(response) {
		yield put({
			type: SUCCESS,
			payload: {
				...payload,
				data: response.Data.data,
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
