import {combineReducers} from 'redux';

import {initial} from '../initial';

// Затемнение
import smoke,		{module as smoke_module}		from './smoke';

// Акции
import promo,		{module as promo_module}		from './promo';
import promo_list,	{module as promo_list_module}	from './promo/list';
import promo_my,	{module as promo_my_module}		from './promo/my';
import promo_view,	{module as promo_view_module}	from './promo/view';
import promo_add_check,	{module as promo_add_check_module}	from './promo/add_check';

// Настройки
import settings,	{module as settings_module}		from './settings';

export default combineReducers({
	// data: (state=initial) => state,
	[smoke_module]:			smoke,

	[promo_module]:			promo,
	[promo_list_module]:	promo_list,
	[promo_my_module]:		promo_my,
	[promo_view_module]:	promo_view,
	[promo_add_check_module]:	promo_add_check,

	[settings_module]:		settings,
});
