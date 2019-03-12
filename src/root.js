import React,{Component}							from 'react';
import {AsyncStorage,Dimensions,Linking,StatusBar}	from 'react-native';
import EStyleSheet					from 'react-native-extended-stylesheet';
import firebase						from 'react-native-firebase';
import {
	createAppContainer,
	createDrawerNavigator,
	NavigationActions
}									from 'react-navigation';
import {Provider}					from 'react-redux';

import config						from './config';
import colors						from './config/colors';

import Smoke						from './containers/smoke';

import Empty						from './screens/empty';
import Onboarding					from './screens/onboarding';
import Splash						from './screens/splash';

import PromoNavigator				from './navigation/promo';
import MyPromoNavigator				from './navigation/my_promo';

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

// Аналитика
firebase.analytics().setAnalyticsCollectionEnabled(true);

// Страницы приложения
var Navigator = createAppContainer(createDrawerNavigator(
	{
		promo:						PromoNavigator,
		my_promo:					MyPromoNavigator,
	},
	{
		initialRouteName: 'promo',
	}
));

export default class Router extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// page: 'start',
			page: 'navigator',
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
		// if(Object.keys(data).length)	this.set_page('splash');
		// else							this.set_page('onboarding');
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
