import {NetInfo} from 'react-native';
import check_data from './check_data';

var domain = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

export default async function(method,data = {}) {
		try {
			let res = await fetch(domain,{
				method: 'POST',
				// mode: 'no-cors',
				// crossDomain: true,
				headers: {
					'Accept':		'application/json',
					'Content-Type':	'application/json',
					'Authorization':'Token 5d446e7f158e0c8b8de537cdf70d437d3198429b',
				},
				body: JSON.stringify({query:data, count:10}),
			});

			let found_error = await check_data(data);
			if(found_error) return found_error;

			if(res.status == 200) {
				let data = (await res.json()).d.Data.data;
				// console.log(data);
				if(data.Result === false) {
					return {error:{message:data.Code}};
				} else {
					return {response:data};
				}
			} else if(res.status == 500) {
				return {error:{code:res.status,message:'Сервер не доступен'}};
			} else {
				console.log(res);

				let connection_info = await NetInfo.getConnectionInfo();
				if(connection_info.type == 'none') return {error:{message:'Нет интернета'}};

				return {error:{code:res.status,message:'Проблемы со связью'}};
			}
		} catch(e) {
			console.log(e);
			return {error:{message:'Не удается выполнить запрос'}};
		}
}