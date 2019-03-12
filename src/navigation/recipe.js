import React						from 'react';
import {
	createAppContainer,
	createStackNavigator,
	NavigationActions
}									from 'react-navigation';

import config						from '../config';

import RecipeScreen					from '../screens/recipe';

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
		recipe:						RecipeScreen,

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
		initialRouteName: 'recipe',
	}
);
