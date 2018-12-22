import {all} from 'redux-saga/effects';

// Акции
import {saga as promo_list}					from './reducers/promo/list';
import {saga as promo_my}					from './reducers/promo/my';
import {saga as promo_view}					from './reducers/promo/view';

// Настройки
import {saga as settings}					from './reducers/settings';

// Главная сага, которая исполняет все остальные саги
export default function* root_saga() {
	yield all([
		promo_list(),
		promo_my(),
		promo_view(),
		settings(),
	]);
}
