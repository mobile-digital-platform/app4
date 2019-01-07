import config		from '../config';
// import city_list0	from '../config/city/list0.json';
// import city_list1	from '../config/city/list1.json';
// import city_list2	from '../config/city/list2.json';
// import city_list3	from '../config/city/list3.json';

export default {
	find_city: (id) => {
		const city_list0 = require('../config/city/list0.json');
		for(let i=0; i<city_list0.length; i++) if(city_list0[i].id == id) return city_list0[i].name;

		const city_list1 = require('../config/city/list1.json');
		for(let i=0; i<city_list1.length; i++) if(city_list1[i].id == id) return city_list1[i].name;

		const city_list2 = require('../config/city/list2.json');
		for(let i=0; i<city_list2.length; i++) if(city_list2[i].id == id) return city_list2[i].name;

		const city_list3 = require('../config/city/list3.json');
		for(let i=0; i<city_list3.length; i++) if(city_list3[i].id == id) return city_list3[i].name;

		// return city_list.filter(e => e.id==id)[0].name;
	},
	search_city: (name) => {
		let res = [];

		const city_list0 = require('../config/city/list0.json');
		for(let i=0; i<city_list0.length; i++) {
			if(city_list0[i].name.substr(0,name.length) == name) res.push(city_list0[i]);
			if(res.length >= config.city.limit) return res;
		}

		const city_list1 = require('../config/city/list1.json');
		for(let i=0; i<city_list1.length; i++) {
			if(city_list1[i].name.substr(0,name.length) == name) res.push(city_list1[i]);
			if(res.length >= config.city.limit) return res;
		}

		const city_list2 = require('../config/city/list2.json');
		for(let i=0; i<city_list2.length; i++) {
			if(city_list2[i].name.substr(0,name.length) == name) res.push(city_list2[i]);
			if(res.length >= config.city.limit) return res;
		}

		const city_list3 = require('../config/city/list3.json');
		for(let i=0; i<city_list3.length; i++) {
			if(city_list3[i].name.substr(0,name.length) == name) res.push(city_list3[i]);
			if(res.length >= config.city.limit) return res;
		}

		// return city_list.filter(e => e.name.substr(0,name.length)==name);
	},
};
