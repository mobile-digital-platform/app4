import React,{Component}				from 'react';
import {AsyncStorage,Linking,StatusBar}	from 'react-native';
import {
	createStackNavigator,
	createAppContainer
}									from 'react-navigation';
import {Provider}					from 'react-redux';

import config						from './config';

import Smoke						from './containers/smoke';

import Empty						from './screens/empty';
import Onboarding					from './screens/onboarding';
import Splash						from './screens/splash';

import PromoListScreen				from './screens/promo/list';
import PromoViewScreen				from './screens/promo/view';
import PromoDetailsScreen			from './screens/promo/details';
import PromoParticipateScreen		from './screens/promo/participate';
import PromoMyListScreen			from './screens/promo/my';
import PromoAddCheckScreen			from './screens/promo/add_check';
import PromoGetPrizeScreen			from './screens/promo/get_prize';
import PromoChoosePrizeScreen		from './screens/promo/choose_prize';
import PromoMyPrizesScreen			from './screens/promo/my_prizes';
import PromoAsk						from './screens/promo/ask';
import PromoPassport				from './screens/promo/passport';

import SettingsScreen				from './screens/settings/main';
import ConfirmPhoneScreen			from './screens/settings/confirm_phone';
import AuthorizationScreen			from './screens/settings/authorization';
import ChangeCityScreen				from './screens/settings/change_city';
import SettingsAddLoyaltyCardScreen	from './screens/settings/add_loyalty_card';

import WebScreen					from './screens/web';

import store						from './redux';
import {request}					from './redux/reducers/settings';

import alert						from './services/alert';

StatusBar.setBarStyle('light-content',true);

var Navigator = createAppContainer(createStackNavigator(
	{
		promo_list:					PromoListScreen,
		promo_view:					PromoViewScreen,
		promo_details:				PromoDetailsScreen,
		promo_participate:			PromoParticipateScreen,
		promo_my_view:				PromoMyListScreen,
		promo_add_check:			PromoAddCheckScreen,
		promo_get_prize:			PromoGetPrizeScreen,
		promo_choose_prize:			PromoChoosePrizeScreen,
		promo_my_prizes:			PromoMyPrizesScreen,
		promo_ask:					PromoAsk,
		promo_passport: 			PromoPassport,

		settings:					SettingsScreen,
		settings_confirm_phone:		ConfirmPhoneScreen,
		settings_authorization:		AuthorizationScreen,
		settings_change_city:		ChangeCityScreen,
		settings_add_loyalty_card:	SettingsAddLoyaltyCardScreen,
		web:						WebScreen,
	},
	{
		//initialRouteName: 'promo_list',
		// initialRouteName: 'promo_view',
		// initialRouteName: 'promo_details',
		// initialRouteName: 'promo_participate',
		// initialRouteName: 'promo_my_view',

		 //initialRouteName: 'promo_add_check', 		// кассовый чек
		initialRouteName: 'promo_get_prize',			// получить выигрыш
		// initialRouteName: 'promo_passport', 			// паспортные данные
		// initialRouteName: 'promo_choose_prize',		// выбор приза
		// initialRouteName: 'promo_my_prizes', 			// мои призы
		// initialRouteName: 'promo_ask', 				// задать вопрос


		// initialRouteName: 'settings',
		// initialRouteName: 'settings_confirm_phone',
		// initialRouteName: 'settings_authorization',
		// initialRouteName: 'settings_change_city',
		// initialRouteName: 'settings_add_loyalty_card',
		// initialRouteName: 'web',
	}
));
// cocacolapromo://confirm_mail/123
export default class Router extends Component {
	state = {
		page: 'start',
	};

	async componentDidMount() {
		Linking.addEventListener('url',this.handle_open_url);
		Linking.getInitialURL().then(url => {
			this.handle_open_url({url});
		});

		// await AsyncStorage.removeItem(config.storage_name);
		// console.log(await AsyncStorage.getItem(config.storage_name));
		// return;
		let data = JSON.parse(await AsyncStorage.getItem(config.storage_name)) ?? {};
		// console.log(data);
		if(Object.keys(data).length)	this.set_page('splash');
		else							this.set_page('onboarding');
	}
	componentWillUnmount() {
		Linking.removeEventListener('url',this.handle_open_url);
	}

	handle_open_url = async ({url}) => {
		if(url) {
			let route = url.replace(/.*?:\/\//g,'');
			let [method,code] = route.split('/');
			if(method == 'confirm_mail') {
				let user_id = JSON.parse(await AsyncStorage.getItem(config.storage_name))?.user?.id;
				if(user_id) {
					let {response,error} = await request.mail_confirm({user_id,code});
					if(response) {
						await alert('Адрес почты успешно подтвержден');
					}
					if(error) {
						await alert('Ошибка при подтверждении адреса почты',error.message);
					}
				}
			}
		}
	}

	set_page = (page) => this.setState({page});

	render() {
		return (
			<Provider store={store}>
				{this.state.page == 'start' ? (<Empty />) : null}
				{this.state.page == 'onboarding' ? (<Onboarding set_page={this.set_page} />) : null}
				{this.state.page == 'splash' ? (<Splash set_page={this.set_page} />) : null}
				{this.state.page == 'navigator' ? (<Navigator />) : null}
				<Smoke/>
			</Provider>
		);
	}
}
