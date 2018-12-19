import React from 'react';
import {Alert} from 'react-native';

export default async (title,message,buttons,options) => new Promise((resolve,reject) => {
	if(!buttons) buttons = [
		{
			text: 'Да',
			onPress: () => resolve(true),
		},
	];
	if(!options) options = {cancelable:false};
	Alert.alert(title,message,buttons,options);
});
