import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import config from '../../../config';
import API from '../../../services/api';

export const ReducerRecord = () => ({
	scan_list: ['https://cs7.pikabu.ru/post_img/big/2017/12/30/12/1514665429137170972.jpg'],
	camera_visible: false,
	qr_visible: false,
	date: '',
	time: '',
	summa: '',
	fn: '',
	fd: '',
	fp: '',
});

// Постоянные
export const module = 'add_check';

export const CHANGE_CAMERA = config.name + '/' + module + '/CHANGE_CAMERA';
export const CHANGE_QR = config.name + '/' + module + '/CHANGE_QR';

// Редуктор
export default function reducer(st = ReducerRecord(), action) {
	const { type, payload, error } = action;
	// console.log("ACTION",type);
	// console.log("STATE",st);

	switch (type) {
		// Установка данных в местное хранилище
		case CHANGE_CAMERA:
			return {
				...st,
				camera_visible: payload,
			};
		case CHANGE_QR:
			return {
				...st,
				qr_visible: payload,
			};
	}

	return { ...st };
}

// Действия
export const change_camera = (payload) => ({ type: CHANGE_CAMERA, payload });
export const change_qr = (payload) => ({ type: CHANGE_QR, payload });