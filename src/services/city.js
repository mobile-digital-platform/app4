import config		from '../config';
import city_list	from '../config/city_list0.json';

export default {
	find_city: (id)   => city_list.filter(e => e.id==id)[0].name,
	search_city: (name) => {
		let res = [];
		for(let i=0; i<city_list.length; i++) {
			if(city_list[i].name.substr(0,name.length) == name) res.push(city_list[i]);
			if(res.length >= config.city.limit) break;
		}
		return res;
		// return city_list.filter(e => e.name.substr(0,name.length)==name);
	},
};
