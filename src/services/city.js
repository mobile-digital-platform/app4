import city_list from '../config/city_list0.json';

export default {
	find_city: (id)   => city_list.filter(e => e.id==id)[0].name,
	search_city: (name) => city_list.filter(e => e.name.substr(0,name.length)==name),
};
