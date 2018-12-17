// import {Permissions,Notifications} from 'expo';
//
// export default async function() {
// 	const {status:existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
// 	let finalStatus = existingStatus;
//
// 	if(existingStatus !== 'granted') finalStatus = (await Permissions.askAsync(Permissions.NOTIFICATIONS)).status;
//
// 	if(finalStatus !== 'granted') return false;
//
// 	let token = await Notifications.getExpoPushTokenAsync();
// 	return token;
// }
