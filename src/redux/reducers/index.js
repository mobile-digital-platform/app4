import {combineReducers} from 'redux';

import {initial} from '../initial';

// Затемнение
import smoke,		{module as smoke_module}		from './smoke';

// Акции
import promo_list,	{module as promo_list_module}	from './promo/list';
import promo_my,	{module as promo_my_module}		from './promo/my';
import promo_view,	{module as promo_view_module}	from './promo/view';

// Настройки
import settings,	{module as settings_module}		from './settings';

export default combineReducers({
	// data: (state=initial) => state,
	[smoke_module]:			smoke,

	[promo_list_module]:	promo_list,
	[promo_my_module]:		promo_my,
	[promo_view_module]:	promo_view,

	[settings_module]:		settings,
});
