import React						from 'react';
import {
	createAppContainer,
	createStackNavigator,
	NavigationActions
}									from 'react-navigation';

import config						from '../config';

import PromoMyListScreen			from '../screens/promo/my_list';
import PromoViewScreen				from '../screens/promo/view';
import PromoDetailsScreen			from '../screens/promo/details';
import PromoParticipateScreen		from '../screens/promo/participate';
import PromoMyListScreen			from '../screens/promo/my';

import PromoAddCheckScreen			from '../screens/promo/add_check';
import PromoChoosePrizeScreen		from '../screens/promo/choose_prize';
import PromoMyPrizesScreen			from '../screens/promo/my_prizes';
import PromoAddressScreen			from '../screens/promo/address';
import PromoPassportScreen			from '../screens/promo/passport';

import SettingsScreen				from '../screens/settings/main';
import ConfirmPhoneScreen			from '../screens/settings/confirm_phone';
import AuthorizationScreen			from '../screens/settings/authorization';
import ChangeCityScreen				from '../screens/settings/change_city';
import ChangeAddressScreen			from '../screens/settings/change_address';
import SettingsAddLoyaltyCardScreen	from '../screens/settings/add_loyalty_card';

import HelpScreen					from '../screens/help';
import WebScreen					from '../screens/web';

// Страницы приложения
export default createStackNavigator(
	{
		promo_list:					PromoMyListScreen,
		promo_view:					PromoViewScreen,
		promo_details:				PromoDetailsScreen,
		promo_participate:			PromoParticipateScreen,
		promo_my_view:				PromoMyListScreen,

		promo_add_check:			PromoAddCheckScreen,
		promo_choose_prize:			PromoChoosePrizeScreen,
		promo_my_prizes:			PromoMyPrizesScreen,
		promo_address:				PromoAddressScreen,
		promo_passport: 			PromoPassportScreen,

		settings:					SettingsScreen,
		settings_confirm_phone:		ConfirmPhoneScreen,
		settings_authorization:		AuthorizationScreen,
		settings_change_city:		ChangeCityScreen,
		settings_change_address:	ChangeAddressScreen,
		settings_add_loyalty_card:	SettingsAddLoyaltyCardScreen,

		help:						HelpScreen,
		web:						WebScreen,
	},
	{
		initialRouteName: 'promo_list',
	}
);
