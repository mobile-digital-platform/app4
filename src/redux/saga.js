import {all} from 'redux-saga/effects';

// Акции
import {saga as promo}		from './reducers/promo';

// Настройки
import {saga as settings}	from './reducers/settings';

// Главная сага, которая исполняет все остальные саги
export default function* root_saga() {
	yield all([
		promo(),
		settings(),
	]);
}
