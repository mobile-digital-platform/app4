import {combineReducers} from 'redux';

import {initial} from '../initial';

import smoke,		{module as smoke_module}		from './smoke';		// Затемнение
import promo,		{module as promo_module}		from './promo';		// Акции
import settings,	{module as settings_module}		from './settings';	// Настройки

export default combineReducers({
	// data: (state=initial) => state,
	[smoke_module]:			smoke,
	[promo_module]:			promo,
	[settings_module]:		settings,
});
