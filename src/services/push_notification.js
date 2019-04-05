import {Alert,Platform,PushNotificationIOS} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {NavigationActions} from 'react-navigation';

import config from '../config';

import alert from '../services/alert';

export default {
	init: () => {
		PushNotification.configure({
			onRegister: ({token}) => console.log('TOKEN:',token),
			onNotification: async (notification) => {
				console.log('NOTIFICATION:',notification);
				// alert(JSON.stringify(notification,null,4));

				// Если приложение открыто, то не надо показывать сразу, а то потом пользователь нажмет на уведомление и откроет еще раз
				if(
					notification &&
					!notification.foreground &&
					(notification.title?.length || notification.data?.title?.length) &&
					notification.data?.PromoID>0
				) {
					// Выясняем, на какую страницу его отправить
					let page = '';
					if(notification.data?.Type		== 'PromoAlert')	page = 'promo_details';
					else if(notification.data?.Type == 'CheckAlert')	page = 'promo_my_view';
					else return;

					// Если навигатор еще не запустился, ждем этого
					while(!config.navigator_ref) await new Promise(res => setTimeout(res,500));

					// Показываем окошко
					Alert.alert(
						notification.title	 ?? notification.data?.title	?? 'Уведомление',
						notification.message ?? notification.data?.message	?? '',
						[
							{
								text: 'Открыть акцию',
								onPress: _ => {
									config.navigator_ref.dispatch(NavigationActions.navigate({
										routeName: page,
										params: {id:notification.data?.PromoID},
									}));
								},
							},
							{text:'Позже'},
						],
					);
				}

				// if(Platform.OS == 'ios') notification.finish(PushNotificationIOS.FetchResult.NoData);
				if(Platform.OS == 'ios') notification.finish("backgroundFetchResultNoData");
			},
			senderID: config.fcm_id,
			permissions: {
				alert: true,
				badge: true,
				sound: true
			},
			popInitialNotification: true,
			requestPermissions: false,
		});
	},
	request: () => {
		PushNotification.configure({
			onRegister: ({token}) => console.log(token),
			requestPermissions: true,
		});
	},
	request_async: () => {
		return new Promise(resolve => {
			PushNotification.configure({
				onRegister: ({token}) => resolve(token),
				requestPermissions: true,
			});
		});
	},
	process: (processor) => {
		PushNotification.configure({
			onNotification: (notification) => {
				processor(notification);
				if(Platform.OS == 'ios') notification.finish("backgroundFetchResultNoData");
			},
		});
	},
};
