import {all} from 'redux-saga/effects';

// Акции
import {saga as promo_list}					from './reducers/promo/list';
import {saga as promo_my}					from './reducers/promo/my';
import {saga as promo_view}					from './reducers/promo/view';

// Настройки
import {saga as settings}					from './reducers/settings';
import {saga as settings_authorization}		from './reducers/settings/authorization';
import {saga as settings_change_password}	from './reducers/settings/change_password';
import {saga as settings_confirm_phone}		from './reducers/settings/confirm_phone';
import {saga as settings_personal}			from './reducers/settings/personal';

// Главная сага, которая исполняет все остальные саги
export default function* root_saga() {
	yield all([
		promo_list(),
		promo_my(),
		promo_view(),
		settings(),
		settings_authorization(),
		settings_change_password(),
		settings_confirm_phone(),
		settings_personal(),
	]);
}
