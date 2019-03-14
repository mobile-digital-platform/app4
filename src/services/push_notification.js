import {Platform,PushNotificationIOS} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {NavigationActions} from 'react-navigation';

import config from '../config';

import alert from '../services/alert';

export default {
	init: () => {
		PushNotification.configure({
			onRegister: ({token}) => console.log('TOKEN:',token),
			onNotification: (notification) => {
				console.log('NOTIFICATION:',notification);
				// alert(JSON.stringify(notification,null,4));

				if(notification.userInteraction) {
					// notification.data = {Type:'CheckAlert',PromoID:2};
					if(notification.data && notification.data.PromoID>0) {
						let page = '';
						if(notification.data.Type	   == 'PromoAlert')	page = 'promo_details';
						else if(notification.data.Type == 'CheckAlert')	page = 'promo_my_view';
						else return;
						config.navigator_ref.dispatch(NavigationActions.navigate({
							routeName: page,
							params: {id:notification.data.PromoID},
						}));
					}
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
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			},
		});
	},
};
