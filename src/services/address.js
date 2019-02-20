import {NetInfo} from 'react-native';

var domain = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

export default async function(data = {}) {
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
			body: JSON.stringify({query:data}),
		});

		if(res.status == 200) {
			let data = (await res.json()).suggestions;
			let address = get_address(filter_address(data));
			return address;

		} else if(res.status == 403) {
			return {error:{code:res.status,message:'Сервер перегружен, попробуйте позже'}};
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

const filter_address = (data = []) => data.filter(item => {
	let i = item.data;
	// условие отбора: по ФИАС адрес найден до улицы(7 уровень) + заполненный номер дома + почтовый индекс
	if(i.fias_level >= 7 && i.fias_level != 65 && i.house?.length && i.postal_code?.length){
		// если пользователь - городской житель -требуем также номер квартиры
		return (i.city?.length && !i.flat?.length);
	} else {
		return false;
	}
});

const get_address = (data = []) => data.map(item => {
	let i = item.data;
	return {
		full:		item.value,
		id: 		i.fias_id,
		postcode: 	i.postal_code,
		region: 	[i.region_with_type,i.area_with_type].join(' ').trim(),
		city: 		i.city_with_type ?? i.settlement_with_type,
		street: 	i.street_with_type,
		building: 	[i.house_type,i.house,i.block_type,i.block].join(' ').trim(),
		apartment: 	i.flat,
	}
});
