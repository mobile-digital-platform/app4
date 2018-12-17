var domain = 'http://api.emg.ru/cc_v1/WebServiceCC.asmx';

export default async function(method,data = {}) {
	if(method.substr(-1) == '/') method = method.substr(0,-1);
	if(method.substr(0,1) != '/') method = '/'+method;
	if(methods.indexOf(method) != -1) {
		console.log("API: "+domain+method,data);
		try {
			let res = await fetch(domain+method,{
				method: 'POST',
				// mode: 'no-cors',
				// crossDomain: true,
				headers: {
					'Accept':		'application/json',
					'Content-Type':	'application/json',
					'login':		'api_emg_cc',
					'password':		'OkhoVw7UjM',
				},
				body: JSON.stringify({Data:data}),
			});

			// yield new Promise(res => setTimeout(res,1000));

			if(res.status == 200) {
				let data = (await res.json()).d.Data.data;
				// console.log(data);
				if(data.Result === false) {
					return {error:{message:data.Code}};
				} else {
					return {response:data};
				}
			} else {
				console.log(res);
				return {error:{code:res.status,message:'Сервер не доступен'}};
			}
		} catch(e) {
			console.log(e);
			return {error:{code:'Не удается выполнить запрос'}};
		}
	} else {
		console.log("Неизвестный метод АПИ: ",method);
	}
}

var methods = [
	// Акции
	'/PromoGroupList',
	'/PromoList',
	'/JoinPromo',
	'/GetNetworkList',
	'/GetPromoDetails',

	// Пользователь
	'/Register',
	'/Authorize',
	'/PhoneSendPassword',
	'/PhoneSendCode',
	'/PhoneConfirm',
	'/MailSendCode',
	'/EmailConfirm',
	'/UserDataGet',
	'/UserDataEdit',

	// Карты лояльности
	'/AddLoyalityCard',
	'/DeleteLoyalityCard',

	// Чеки
	'/AddCheckData',
	'/UploadCheckPhoto',
	'/GetChecks',

	// Подарки
	'/GetPrizeList',
	'/GetPrizeAccessibleMethods',
	'/BuyPrize',
	'/GetUserPrizes',
	'/ConfirmGetPrizeDetails',

	// Центры выдачи
	'/PrizeCenterList',
	'/SetPrizeCenter',

	// Указание паспортных данных
	'/GetRegistationData',
	'/SetRegistationData',
	'/GetDeliveryAddress',
	'/SetDeliveryAddress',
	'/GetPassportData',
	'/SetPassportData',
	'/UploadPassportData',

	// Спросить вопрос
	'/AskQuestion',
];

/*
Генераторная функция
export default function*(method,data = {}) {
	if(method.substr(-1) == '/') method = method.substr(0,-1);
	if(method.substr(0,1) != '/') method = '/'+method;
	if(methods.indexOf(method) != -1) {
		console.log("API: "+domain+method,data);
		let res = yield fetch(domain+method,{
			method: 'POST',
			// mode: 'no-cors',
			// crossDomain: true,
			headers: {
				'Accept':		'application/json',
				'Content-Type':	'application/json',
				'login':		'api_emg_cc',
				'password':		'OkhoVw7UjM',
			},
			body: JSON.stringify({Data:data}),
		});

		// yield new Promise(res => setTimeout(res,1000));

		if(res.status == 200) {
			let data = (yield res.json()).d.Data.data;
			// console.log(data);
			if(data.Result === false) {
				return {error:{message:data.Code}};
			} else {
				return {response:data};
			}
		} else {
			console.log(res);
			return {error:{code:res.status,message:'Сервер не доступен'}};
		}
	} else {
		console.log("Неизвестный метод АПИ: ",method);
	}
}
*/
