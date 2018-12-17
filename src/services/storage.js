import {AsyncStorage} from 'react-native';

import config from '../config';
const storage_name = config.storage_name;

// Хранилище местных данных
export default new function() {
	var st = {};

	// Здесь определена исходная структура хранилища
	var ready = AsyncStorage.getItem(storage_name);
	ready.then(async data => {
		if((data === null)) {
			st = {};
			await AsyncStorage.setItem(storage_name,JSON.stringify(st));
		} else {
			st = JSON.parse(data);
		}
	});

	// Получение хранилища
	this.take = async function() {
		await ready;
		st = JSON.parse(await AsyncStorage.getItem(storage_name));
	}
	// Сохранение хранилища
	this.save = async function() {
		await ready;
		await AsyncStorage.setItem(storage_name,JSON.stringify(st));
	}

	// Есть ли данный элемент в хранилище
	this.isset = async function(item) {
		await ready;
		return (item in st);
	}
	// Достать элемент из хранилища
	this.get = async function(item) {
		await ready;
		if(item == '*') return st;
		return st[item];
	}
	// Поменять элемент в хранилище
	this.set = async function(item,value) {
		await ready;
		st[item] = value;
		await this.save();
		return this;
	}
	// Расширить элемент в хранилище
	this.merge = async function(item,value) {
		await ready;
		if(await this.isset(item)) {
			Object.assign(st[item],value);
			await this.save();
		} else {
			await this.set(item,value);
		}
		return this;
	}
	// Убрать элемент из хранилища
	this.remove = async function(item) {
		await ready;
		delete st[item];
		await this.save();
		return this;
	}

	// Изъятие объекта из списка сохраненных в хранилище
	this.get_object = async function(section,id,lifetime = 30*24*60*60*1000) {
		await ready;
		// Ищем сохраненный
		for(let i=0; i<st[section].saved.length; i++) if(st[section].saved[i].id == id) {
			// Если срок годности не вышел то выдаем, иначе удаляем
			if(new Date().getTime()-st[section].saved[i]._st_saved_timestamp < lifetime) {
				return st[section].saved[i];
			} else {
				st[section].saved.splice(i,1);
				break;
			}
		}
		return false;
	}
	// Сохранение объекта в список сохраненных в хранилище
	this.save_object = async function(section,obj) {
		await ready;
		// Ищем, не сохранен ли он уже
		var found = -1;
		for(let i=0; i<st[section].saved.length; i++) if(st[section].saved[i].id == obj.id) {
			found = i;
			break;
		}
		// Изменяем существующий либо сохраняем новый
		if(found>=0)	st[section].saved[found] = Object.assign(obj,{_st_saved_timestamp:new Date().getTime()});
		else			st[section].saved.push    (Object.assign(obj,{_st_saved_timestamp:new Date().getTime()}));

		await this.save();
	}

	// Устанавливаем краткие ссылки на свойста о пользователе
	this.id = this.user_id = null;
	this.we = this.get('user').then(we => {
		this.id = this.user_id = (we ? we.id : null);
	});
}
