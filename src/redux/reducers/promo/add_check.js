import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import config from '../../../config';
import API from '../../../services/api';

export const ReducerRecord = () => ({
	photos: [],
	date: '',
	time: '',
	summa: '',
	fn: '',
	fd: '',
	fp: '',
});

// Постоянные
export const module = 'add_check';

export const UPDATE_CHECK = config.name + '/' + module + '/UPDATE_CHECK';

// Редуктор
export default function reducer(st = ReducerRecord(), action) {
	const { type, payload, error } = action;

	switch (type) {
		// Установка данных в местное хранилище
		case UPDATE_CHECK:
			return {
				...st,
				...payload,
			};
	}
	return { ...st };
}

// Действия
export const update_check = (payload) => {
	console.log('payload',payload);
	return { type: UPDATE_CHECK, payload }
}