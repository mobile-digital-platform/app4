import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import config from '../../../config';
import API from '../../../services/api';

export const ReducerRecord = () => ({
	balance: 100,
	prizes: [
		{
			id: 1,
			title: 'Сет из разделочных досок',
			img: '',
			score_num: '',
			qunatity: 10,
		},
		{
			id: 2,
			title: 'Сет из разделочных досок',
			img: '',
			score_num: '',
			qunatity: 0,
		},
		{
			id: 3,
			title: 'Сет из разделочных досок',
			img: '',
			score_num: '',
			qunatity: 102,
		},
	]
});

// Постоянные
export const module = 'choose_prize';

export const UPDATE_CHECK = config.name + '/' + module + '/GET_PRIZES';
export const UPDATE_CHECK = config.name + '/' + module + '/SEND_CHOISE';

// Редуктор
export default function reducer(st = ReducerRecord(), action) {
	const { type, payload, error } = action;

	switch (type) {
		// Установка данных в местное хранилище
		case GET_PRIZES:
			return {
				...st,
				...payload,
			};
		case SEND_CHOISE:
			return {
				...st,
				...payload,
			};
	}
	return { ...st };
}

// Действия
export const get_prizes = (payload) => ({type: GET_PRIZES, payload})
export const send_choose = (payload) => ({type: SEND_CHOISE, payload})
