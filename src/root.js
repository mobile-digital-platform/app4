import React,{Component}							from 'react';
import {AsyncStorage,Dimensions,Linking,StatusBar}	from 'react-native';
import EStyleSheet					from 'react-native-extended-stylesheet';
import {
	createAppContainer,
	createStackNavigator,
	NavigationActions
}									from 'react-navigation';
import {Provider}					from 'react-redux';

import config						from './config';
import colors						from './config/colors';

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
import PromoChoosePrizeScreen		from './screens/promo/choose_prize';
import PromoMyPrizesScreen			from './screens/promo/my_prizes';
import PromoAddressScreen			from './screens/promo/address';
import PromoPassportScreen			from './screens/promo/passport';

import SettingsScreen				from './screens/settings/main';
import ConfirmPhoneScreen			from './screens/settings/confirm_phone';
import AuthorizationScreen			from './screens/settings/authorization';
import ChangeCityScreen				from './screens/settings/change_city';
import ChangeAddressScreen			from './screens/settings/change_address';
import SettingsAddLoyaltyCardScreen	from './screens/settings/add_loyalty_card';

import HelpScreen					from './screens/help';
import WebScreen					from './screens/web';

import store						from './redux';
import {request}					from './redux/reducers/settings';

import alert						from './services/alert';
import push							from './services/push_notification';

// Глобальные стили
EStyleSheet.build({
	$scale: 1*Dimensions.get('window').width/config.base_width,
	...colors,
});

// Полоска вверху экрана
StatusBar.setBarStyle('light-content',true);

// Уведомления
push.init();

// Страницы приложения
var Navigator = createAppContainer(createStackNavigator(
	{
		promo_list:					PromoListScreen,
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
		// initialRouteName: 'promo_view',
		// initialRouteName: 'promo_details',
		// initialRouteName: 'promo_participate',
		// initialRouteName: 'promo_my_view',
		// initialRouteName: 'promo_add_check', 		// кассовый чек
		// initialRouteName: 'promo_get_prize',			// получить выигрыш
		// initialRouteName: 'promo_change_adress',		// выбрать центр выдачи

		// initialRouteName: 'promo_passport', 			// паспортные данные
		// initialRouteName: 'promo_choose_prize',		// выбор приза
		// initialRouteName: 'promo_my_prizes', 		// мои призы

		// initialRouteName: 'settings',
		// initialRouteName: 'settings_confirm_phone',
		// initialRouteName: 'settings_authorization',
		// initialRouteName: 'settings_change_city',
		// initialRouteName: 'settings_add_loyalty_card',

		// initialRouteName: 'help',
		// initialRouteName: 'web',
	}
));

export default class Router extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 'start',
			// page: 'navigator',
		};
	}

	async componentDidMount() {
		// Обрабатываем заход по ссылке
		Linking.addEventListener('url',this.handle_open_url);
		Linking.getInitialURL().then(url => {
			this.handle_open_url({url});
		});

		// Это чтобы все стереть
		// await AsyncStorage.removeItem(config.storage_name);
		// console.log(await AsyncStorage.getItem(config.storage_name));
		// return;
		let data = JSON.parse(await AsyncStorage.getItem(config.storage_name)) ?? {};
		// console.log(data);
		if(Object.keys(data).length)	this.set_page('splash');
		else							this.set_page('onboarding');
	}
	// componentDidUpdate(prev_props,prev_state) {
	// 	if(prev_state.page != 'navigator' && this.state.page == 'navigator') {
	// 		console.log(config.navigator_ref);
	// 		config.navigator_ref.dispatch(NavigationActions.navigate({
	// 			routeName: 'promo_my_view',
	// 			params: {id:1},
	// 		}));
	// 		console.log("XSS!");
	// 	}
	// }
	componentWillUnmount() {
		Linking.removeEventListener('url',this.handle_open_url);
	}

	handle_open_url = async ({url}) => {
		if(url) {
			let route = url.replace(/.*?:\/\//g,'');
			let [method,code] = route.split('/');

			// Если перешел сюда по ссылке из письма, то отправляем подтверждение почты
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
				{this.state.page == 'start'			? (<Empty/>)	: null}
				{this.state.page == 'onboarding'	? (<Onboarding	set_page={this.set_page} />)	: null}
				{this.state.page == 'splash'		? (<Splash		set_page={this.set_page} />)	: null}
				{this.state.page == 'navigator'		? (<Navigator	ref={ref => config.navigator_ref=ref} />) : null}
				<Smoke/>
			</Provider>
		);
	}
}
