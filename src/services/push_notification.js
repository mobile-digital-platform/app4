import PushNotification from 'react-native-push-notification';

import config from '../config';

export default {
	init: () => {
		PushNotification.configure({
			onRegister: ({token}) => console.log('TOKEN:',token),
			onNotification: (notification) => {
				console.log('NOTIFICATION:',notification);
				notification.finish(PushNotificationIOS.FetchResult.NoData);
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
};
