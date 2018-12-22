import React,{Component}			from 'react';
import {AsyncStorage,StatusBar}		from 'react-native';
import {
	createStackNavigator,
	createAppContainer
}									from 'react-navigation';
import {Provider}					from 'react-redux';

import config						from './config';

import Smoke						from './containers/smoke';

import Onboarding					from './screens/onboarding';
import Splash						from './screens/splash';

import PromoListScreen				from './screens/promo/list';
import PromoViewScreen				from './screens/promo/view';
import PromoDetailsScreen			from './screens/promo/details';
import PromoParticipateScreen		from './screens/promo/participate';
import PromoMyListScreen			from './screens/promo/my';

import SettingsScreen				from './screens/settings/main';
import ConfirmPhoneScreen			from './screens/settings/confirm_phone';
import AuthorizationScreen			from './screens/settings/authorization';
import ChangeCityScreen				from './screens/settings/change_city';
import SettingsAddLoyaltyCardScreen	from './screens/settings/add_loyalty_card';

import WebScreen					from './screens/web';

import store						from './redux';

StatusBar.setBarStyle('light-content',true);

var Navigator = createAppContainer(createStackNavigator(
	{
		promo_list:					PromoListScreen,
		promo_view:					PromoViewScreen,
		promo_details:				PromoDetailsScreen,
		promo_participate:			PromoParticipateScreen,
		promo_my_view:				PromoMyListScreen,
		settings:					SettingsScreen,
		settings_confirm_phone:		ConfirmPhoneScreen,
		settings_authorization:		AuthorizationScreen,
		settings_change_city:		ChangeCityScreen,
		settings_add_loyalty_card:	SettingsAddLoyaltyCardScreen,
		web:						WebScreen,
	},
	{
		initialRouteName: 'promo_list',
		// initialRouteName: 'promo_view',
		// initialRouteName: 'promo_details',
		// initialRouteName: 'promo_participate',
		// initialRouteName: 'promo_my_view',
		// initialRouteName: 'settings',
		// initialRouteName: 'settings_confirm_phone',
		// initialRouteName: 'settings_authorization',
		// initialRouteName: 'settings_change_city',
		// initialRouteName: 'settings_add_loyalty_card',
		// initialRouteName: 'web',
	}
));

export default class Router extends Component {
	state = {
		page: 'onboarding',
	};

	async componentDidMount() {
		let data = JSON.parse(await AsyncStorage.getItem(config.storage_name));
		this.set_page('splash');
	}

	set_page = (page) => this.setState({page});

	render() {
		return (
			<Provider store={store}>
				{this.state.page == 'onboarding'	? (<Onboarding	set_page={this.set_page} />)	: null}
				{this.state.page == 'splash'		? (<Splash		set_page={this.set_page} />)	: null}
				{this.state.page == 'navigator'		? (<Navigator/>) : null}
				<Smoke/>
			</Provider>
		);
	}
}
