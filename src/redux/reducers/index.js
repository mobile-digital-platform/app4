import {combineReducers} from 'redux';

import {initial} from '../initial';

// Затемнение
import smoke,		{module as smoke_module}		from './smoke';

// Акции
import promo,		{module as promo_module}		from './promo';

// Настройки
import settings,	{module as settings_module}		from './settings';

// Добавление чека
import add_check,	{module as add_check_module}	from './add_check';

export default combineReducers({
	// data: (state=initial) => state,
	[smoke_module]:			smoke,

	[promo_module]:			promo,

	[settings_module]:		settings,

	[add_check_module]:		add_check,
});