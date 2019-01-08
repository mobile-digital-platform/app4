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

// Действия

// Запросы
export const request = {
	send: async (data) => {
		let {response,error} = await API('/JoinPromo',{
			UserID: data.user_id,
			PromoID: data.promo_id,
		});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
};

export const saga = function*() {};
