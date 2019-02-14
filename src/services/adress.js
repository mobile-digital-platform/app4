import {NetInfo} from 'react-native';
import check_data from './check_data';

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
			console.log(data);
			let found_error = await check_data(data);
			if(found_error) return found_error;

			if(res.status == 200) {
				let data = (await res.json()).suggestions;
				let temp = get_adress(filter_adress(data));
				console.log('подсказки до и после фильтрации',data,temp)
				return temp;
				
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


const get_adress = function(data = []) {
	return data.map(item => {
		let full = item.value;
		let i = item.data;
		return {
			full: 		full,
			id: 		i.fias_id,
			postcode: 	i.postal_code,

			region: 	(i.region_with_type+' '+i.area_with_type).trim(),
			city: 		i.city_with_type ?? i.settlement_with_type,
			street: 	i.street_with_type,
			building: 	(i.house_type+' '+i.house+' '+i.block_type+' '+i.block).trim(),
			apartment: 	i.flat,
		}
	}
)}

const filter_adress = function(data = []){
	return data.filter(item => {
		// отбираем только те подсказки где по ФИАС найден адрес до дома (8 уровень) и есть почтовый индекс
		if(item.data.fias_level == 8 && item.data.postal_code?.length){
			// если в подсказках адрес городского дома и не указана квартира - убираем эти подсказки
			if(item.data.city?.length && !item.data.flat){
				return false;
			} else{
				return true;
			}
		} else {
			return false;
		}
	})
}
