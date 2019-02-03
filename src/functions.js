// Полезные функции
var f = {};

f.eng_alphabet = 'abcdefghijklmnopqrstuvwxyz';

f.days_week = [null,"Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
f.short_days_week = [null,"Пн","Вт","Ср","Чт","Пт","Сб","Вс"];
f.days_word = [
	"Нулевое",
	"Первое","Второе","Третье","Четвертое","Пятое","Шестое","Седьмое","Восьмое","Девятое","Десятое",
	"Одиннадцатое","Двенадцатое","Тринадцатое","Четырнадцатое","Пятнадцатое",
	"Шестнадцатое","Семнадцатое","Восемнадцатое","Девятнадцатое","Двадцатое",
	"Двадцать первое","Двадцать второе","Двадцать третье","Двадцать четвертое","Двадцать пятое",
	"Двадцать шестое","Двадцать седьмое","Двадцать восьмое","Двадцать девятое","Тридцатое",
	"Тридцать первое","Тридцать второе"
];
f.months = [null,"Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
f.month_short = [null,"Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];
f.months_form = [null,"Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
f.month_days_n = [null,31,28,31,30,31,30,31,31,30,31,30,31];	// Дни в месяцах в обычные года
f.month_days_v = [null,31,29,31,30,31,30,31,31,30,31,30,31];	// Дни в месяцах в високосные года

f.isset = function() {
	if(!arguments.length) throw new Error('Empty isset');

	for(let i in arguments) if(arguments[i] === undefined || arguments[i] === null) return false;
	return true;
}

f.htmlspecialchars = function(str) {
	if(!this.isset(str)) return '';
	str = str.toString();
	str = str.replace(/&/g,"&amp;");
	str = str.replace(/</g,"&lt;");
	str = str.replace(/>/g,"&gt;");
	str = str.replace(/"/g,"&quot;");
	return str;
}
f.htmlspecialchars_decode = function(str) {
	if(!this.isset(str)) return '';
	str = str.toString();
	str = str.replace(/&amp;/g,"&");
	str = str.replace(/&lt;/g,"<");
	str = str.replace(/&gt;/g,">");
	str = str.replace(/&quot;/g,'"');
	return str;
}

f.addslashes = function(str) {
	if(!this.isset(str)) return '';
	return str.toString().replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/'/g,"\\'");
}

// Аналог php-функции strstr -- поиск подстроки в строке
f.strstr = function(haystack,needle,before,to_lower) {
	before = !!before;
	to_lower = !!to_lower;
	haystack = haystack.toString();
	if(to_lower) haystack = haystack.toLowerCase();

	var pos = haystack.indexOf(needle);
	if(pos == -1) {
		return false;
	} else {
		if(before)	return haystack.substr(0,pos);
		else		return haystack.slice(pos);
	}
}

f.substr_count = function(haystack,needle) {
	var i = 0;
	if(haystack.indexOf(needle) == -1) {
		return 0;
	} else do {
		i++;
		haystack = haystack.slice(haystack.indexOf(needle)+1);
	} while(haystack.indexOf(needle) > 0);
	return i;
}

f.print_r = function(array,each = 0,view = 1,precision = 1) {
	// Отступы
	var tab = '';
	for(let i=0; i<precision; i++) tab += '\t';

	// Делаем строчку
	var str = '';
	if(array instanceof Array || array instanceof Object) {
		str = 'Array(\n'+tab;
		for(let i in array) {
			if(each == 1) {
				str += i+' => '+this.print_r(array[i],1,true,precision+1)+',\n';
			} else if(each < 0) {
				str += i+' => '+this.print_r(array[i],each+1,true,precision+1)+',\n';
			} else {
				str += i+' => '+array[i]+',\n';
			}
			str += tab;
		}
		str = str.substr(0,str.length-1);
		str += ')';
	} else if(array === undefined) {
		str = 'undefined';
	} else if(array === null) {
		str = 'Null';
	} else {
		str = array.toString();
	}

	if(view) {
		return str;
	} else {
		console.log(str);
		return true;
	}
}

f.var_dump = function(obj,view) {
	var out = "";
	if(obj && (obj instanceof Object || obj instanceof Array)) for(let i in obj) {
		out += i+": "+obj[i]+"\n";
	} else {
		out = obj;
	}

	if(view) {
		return out;
	} else {
		console.log(out);
		return true;
	}
}

f.parse_int = function(str) {
	if(str == null) return '0';
	if(!(str instanceof String)) str = str.toString();
	str = str.replace(',','.');

	let new_str = '';
	for(let i=0; i<str.length; i++) if(i==0 && str[i]=='-' || ['0','1','2','3','4','5','6','7','8','9'].indexOf(str[i])>=0) new_str += str[i];

	if(new_str == '') new_str = '0';
	return new_str;
}
f.parse_float = function(str) {
	if(str == null) return '0.0';
	if(!(str instanceof String)) str = str.toString();
	str = str.replace(',','.');

	let new_str = '';
	for(let i=0; i<str.length; i++) if(i==0 && str[i]=='-' || ['0','1','2','3','4','5','6','7','8','9','.'].indexOf(str[i])>=0) new_str += str[i];

	if(new_str == '') new_str = '0.0';
	return new_str;
}
f.string36_to_num = function(str) {
	var alphabet = '0123456789'+this.eng_alphabet;

	var new_str = '';
	for(let i=0; i<str.length; i++) if(alphabet.indexOf(str[i])>=0) new_str += str[i];

	var num = 0;
	for(let i=0; i<new_str.length; i++) num += alphabet.indexOf(new_str[new_str.length-i-1])*Math.pow(36,i);
	return num;
}

f.in_Array = function(needle,haystack,strict) {
	strict = !!strict;
	for(let key in haystack) if((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) return true;
	return false;
}
f.find_in_Array = function(needle,haystack,strict) {
	strict = !!strict;
	for(let key in haystack) if((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) return key;
	return false;
}

// round с плюшками
f.round = function(num,precision) {
	num = Math.round(num*Math.pow(10,precision))/Math.pow(10,precision);
	if(!this.strstr(num,'.').length) num += '.';
	var diff = precision-this.strstr(num,'.').length+1;

	for(let i=0; i<diff; i++) num += '0';
	return num;
}

// Уменьшение разрядов числа в надпись
f.reduce_digit_number = function(num,del = 3,pretty = true) {
	var names = {
		18:	'кнтлн',
		15:	'кдрлн',
		12:	'трл',
		9:	'млрд',
		6:	'млн',
		3:	'тыс',
	};
	var round = pretty ? this.round : Math.round;
	var sign;
	if(num > 0) {
		sign = '';
	} else if(num < 0) {
		sign = '-';
		num = Math.abs(num);
	}
	for(let i in names) {
		let name = names[i];
		let digit = +i;
		if(Math.log(num)/Math.LN10 >= digit) return sign+(round(num/Math.pow(10,digit),del)+' '+name+' ').toString().replace('.',',',);
	}
	return sign+round(num,del).toString().replace('.',',',);
}

// Наследование
f.extend = function(child,parent) {
	// Старое:
	// for(let i in parent) child[i] = parent[i];

	// Новое:
	Object.assign(child,parent);
}

// Вывод даты
f.date = function(format,timestamp) {
	var a,jsdate;
	if(timestamp)	jsdate = new Date(timestamp);
	else			jsdate = new Date();

	var txt_weekdays = this.days_week;
	var txt_short_weekdays = this.short_days_week;
	var txt_ordin = {};
	var txt_months = this.months_form;

	var pad = this.pad;

	var f = {
		// День 2 цифры
		d: function() {
			return pad(f.j(),2);
		},
		// День недели
		D: function() {
			return txt_short_weekdays[f.N()];
		},
		// День короткий
		j: function() {
			return jsdate.getDate();
		},
		// День полный
		l: function() {
			return txt_weekdays[f.N()];
		},
		// Сегодняшнее число
		N: function() {
			return jsdate.getDay()?jsdate.getDay():7;
		},
		// Падежное окончание числа: 12-е (двеннадцатое)
		S: function() {
			// return txt_ordin[f.j()] ? txt_ordin[f.j()] : '-е';
			// Все равно всегда -е
			return '-е';
		},
		// Вчерашнее число
		w: function() {
			return jsdate.getDay()-1;
		},
		z: function() {
			return (jsdate - new Date(jsdate.getFullYear()+"/1/1").getTime()) / 864e5 >> 0;
		},

		// Неделя
		W: function() {
			var a = f.z(),b = 364+f.L() - a;
			var nd2,nd = (new Date(jsdate.getFullYear()+"/1/1").getDay() || 7) - 1;

			if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
				return 1;
			} else {
				if(a <= 2 && nd >= 4 && a >= (6 - nd)) {
					nd2 = new Date(jsdate.getFullYear() - 1+"/12/31");
					return this.date("W",Math.round(nd2.getTime()/1000));
				} else{
					return (1+(nd <= 3 ? ((a+nd) / 7) : (a - (7 - nd)) / 7) >> 0);
				}
			}
		},

		// Месяц полный
		F: function() {
			return txt_months[f.n()];
		},
		// Месяц две цифры
		m: function() {
			return pad(f.n(),2);
		},
		// Месяц три буквы
		M: function() {
			var t = f.F(); return t.length>4 ? t.substr(0,3) : t;
		},
		// Месяц
		n: function() {
			return jsdate.getMonth()+1;
		},
		// Количество дней в месяце
		t: function() {
			var n;
			if((n = jsdate.getMonth()+1) == 2) {
				return 28+f.L();
			} else {
				if(n & 1 && n < 8 || !(n & 1) && n > 7) {
					return 31;
				} else {
					return 30;
				}
			}
		},

		// Високосный год
		L: function() {
			var y = f.Y();
			return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0;
		},
		// Год полный
		Y: function() {
			return jsdate.getFullYear();
		},
		// Год две цифры
		y: function() {
			return (jsdate.getFullYear()+"").slice(2);
		},

		// Время дня
		a: function() {
			return jsdate.getHours() > 11 ? "вечера" : "утра";
		},
		// Время дня большими буквами
		A: function() {
			return f.a().toUpperCase();
		},
		B: function() {
			var off = (jsdate.getTimezoneOffset()+60)*60;
			var theSeconds = (jsdate.getHours() * 3600) +
							 (jsdate.getMinutes() * 60) +
							  jsdate.getSeconds()+off;
			var beat = Math.floor(theSeconds/86.4);
			if(beat > 1000) beat -= 1000;
			if(beat <    0) beat += 1000;
			beat = pad(beat,3)
			return beat;
		},
		// Часы до 12
		g: function() {
			return jsdate.getHours() % 12;
		},
		// Часы до 24
		G: function() {
			return jsdate.getHours();
		},
		// Часы до 12 две цифры
		h: function() {
			return pad(f.g(),2);
		},
		// Часы до 24 две цифры
		H: function() {
			return pad(jsdate.getHours(),2);
		},
		// Минуты две цифры
		i: function() {
			return pad(jsdate.getMinutes(),2);
		},
		// Секунды две цифры
		s: function() {
			return pad(jsdate.getSeconds(),2);
		},

		// Временная зона
		O: function() {
		   var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100),4);
		   if(jsdate.getTimezoneOffset() > 0) t = "-"+t;
		   else t = "+"+t;
		   return t;
		},
		P: function() {
			var O = f.O();
			return (O.substr(0,3)+":"+O.substr(3,2));
		},

		// Полная дата/время
		c: function() {
			return f.Y()+"-"+f.m()+"-"+f.d()+"T"+f.h()+":"+f.i()+":"+f.s()+f.P();
		},

		// Секунды с 1970 года
		U: function() {
			return Math.round(jsdate.getTime()/1000);
		}
	};

	return format.replace(/[\\]?([a-zA-Z])/g,function(t,s) {
		var ret;
		if(t!=s) {
			// пропущенные
			ret = s;
		} else if(f[s]) {
			// существующуя функция даты
			ret = f[s]();
		} else {
			// ничего особенного
			ret = s;
		}

		return ret;
	});
}
f.pad = function(str,l) {
	if((str = str+"").length < l)	return new Array(++l - str.length).join("0")+str;
	else							return str;
}

// Дата и время
f.time = function(time) {
	var now = (time!==undefined&&time!==null ? new Date(time) : new Date());
	return now.getTime();
}
f.mktime = function(date) {
	return this.time(new Date(date));
}
f.mkdate = function(date) {
	return new Date(date);
}

// Перевод секунд в время разных форматов
f.seconds_to_time = function(input,type) {
	var time,seconds,minutes,hours,format,stage,second,minute,hour;
	if(!type) type = 'time';
	seconds = this.round(input,3);
	if(type == 'seconds') {
		seconds = Math.round(seconds);
		time    = seconds;

	} else if(type == 'minutes') {
		minutes = Math.floor(seconds/60);
		seconds = seconds-minutes*60;
		if(seconds >= 60) minutes++;
		time = minutes;

	} else if(type == 'hours') {
		minutes = Math.floor(seconds/60);
		seconds = seconds-minutes*60;
		if(seconds >= 60) minutes++;

		hours   = Math.floor(minutes/60);
		minutes = minutes-hours*60;
		if(minutes >= 60) hours++;
		time = hours;

	} else if(type.substr(0,7) == 'format=') {
		format = type.substr(7);
		stage  = format.split(':');

		second	= 0;
		minute	= 0;
		hour	= 0;
		for(let i=0; i<stage.length; i++) {
			if(this.in_Array(stage[i],Array('s')))		second++;
			else if(this.in_Array(stage[i],Array('m')))	minute++;
			else if(this.in_Array(stage[i],Array('h')))	hour++;
		}

		time = seconds;

		if(minute) {
			minutes = Math.floor(seconds/60);
			seconds = this.round(seconds-minutes*60,3);

			var fmod = ((seconds % 1.0).toString().indexOf('.') != -1) ? this.strstr((seconds % 1.0),'.').substr(1) : 0;
			if(fmod == 0)							seconds += '.000';
			else if(fmod.toString().length == 1)	seconds += '00';
			else if(fmod.toString().length == 2)	seconds += '0';

			if(second == 2 && seconds < 10)	seconds = '0'+seconds;
			if(minute == 2 && minutes < 10)	minutes = '0'+minutes;

			time = minutes+':'+seconds;

			if(hour) {
				hours   = Math.floor(minutes/60);
				minutes = minutes-hours*60;

				if(hour == 2 && hours < 10)	hours = '0'+hours;

				time = hours+':'+minutes+':'+seconds;
			}
		}

	} else if(type == 'relative') {
		if(seconds >= 60) {
			minutes = Math.floor(seconds/60);
			seconds = seconds-minutes*60;

			if(seconds.toString().length == 1) seconds = '0'+seconds;

			if(minutes >= 60) {
				hours   = Math.floor(minutes/60);
				minutes = minutes-hours*60;

				if(minutes.toString().length == 1) minutes = '0'+minutes;
				if(hours.toString().length   == 1) hours   = '0'+hours;

				time = hours+':'+minutes+':'+seconds;
			} else {
				time = minutes+':'+seconds;
			}
		} else {
			time = seconds;
		}

	} else if(type = 'time') {
		minutes = Math.floor(seconds/60);
		seconds = this.round((seconds-minutes*60),3);

		hours   = Math.floor(minutes/60);
		minutes = this.round((minutes-hours*60),3);

		fmod = ((seconds % 1.0).toString().indexOf('.') != -1) ? this.strstr((seconds % 1.0),'.').substr(1) : 0;
		if(fmod == 0)							seconds += '.000';
		else if(fmod.toString().length == 1)	seconds += '00';
		else if(fmod.toString().length == 2)	seconds += '0';
		else if(fmod.toString().length >  3)	seconds = this.round(seconds,3);

		if(seconds	< 10) seconds = '0'+seconds;
		if(minutes	< 10) minutes = '0'+minutes;
		if(hours	< 10) hours   = '0'+hours;

		time = hours+':'+minutes+':'+seconds;
	}
	return time;
}

/* ФУНКЦИИ ДЛЯ РАБОТЫ С МАССИВАМИ */

// Сумма элементов массива
f.sum = function(array) {
	var sum = 0;
	for(let i=0; i<array.length; i++) if(!isNaN(array[i])) sum += array[i]/1;
	return sum;
}
// Количество элементов массива
f.count = function(array,strict) {
	var count = 0;
	for(let i=0; i<array.length; i++) if(!strict || strict && array[i] !== undefined && array[i] !== null) count += 1/1;
	return count;
}
// Максимальный элемент массива
f.max = function(array,start,end) {
	var max = -Infinity;
	for(let i=0; i<array.length; i++) {
		if(i < start) continue;
		if(end && i == end) break;
		if(array[i] > max) max = array[i];
	}
	return max;
}
// Минимальный элемент массива
f.min = function(array,start,end) {
	var min = Infinity;
	for(let i=0; i<array.length; i++) {
		if(i < start) continue;
		if(end && i == end) break;
		if(array[i] < min) min = array[i];
	}
	return min;
}

f.array_to_str = function(array,use_zero = false,use_key = false) {
	var str = '';
	for(let i=0; i<array.length; i++) {
		if(!use_zero && !i) continue;
		str += ','+(use_key ? i : array[i]);
	}
	return str.substr(1);
}

f.obj_to_array = function(obj,use_key = false) {
	var arr = [];
	for(let i in obj) arr.push(use_key ? i : obj[i]);
	return arr;
}

// Случайное число в промежутке
f.rand = function(min,max) {
	return Math.floor(Math.random()*(max+1-min)+min);
}

// Случайный выбор с различной вероятностью
f.random_choice = function(array) {
	var sum = 0;
	for(let i=0; i<array.length; i++) if(array[i] > 0) sum += this.parse_int(array[i])/1;
	for(let i=0; i<array.length; i++) array[i] /= sum;

	var rnd = Math.random();
	var max = 0;
	for(let i=0; i<array.length; i++) {
		max += array[i]/1;
		if(rnd < max) return i;
	}
	if(max == 0) return false;
}

// Падеж числительного
f.number_case = function(number,type) {
	number = Math.abs(number);
	let str = '';

	// от 2 до 4
	if(number > 1 && number < 5) {
		if(type == 1)		str += 'а';
		else if(type == 2)	str += 'ы';
		else if(type == 3)	str += 'я';

	// от 5 до 20 и 0
	} else if(number == 0 || number > 4 && number < 21) {
		if(type == 1)		str += 'ов';
		else if(type == 2)	str += '';
		else if(type == 3)	str += 'ей';

	// с последней цифрой от 2 до 5
	} else if(number.toString().substr(-1) > 1 && number.toString().substr(-1) < 5) {
		if(type == 1)		str += 'а';
		else if(type == 2)	str += 'ы';
		else if(type == 3)	str += 'я';

	// с последней цифрой 0 и от 6 до 9
	} else if(number.toString().substr(-1) != 1) {
		if(type == 1)		str += 'ов';
		else if(type == 2)	str += '';
		else if(type == 3)	str += 'ей';
	}
	return str;
}

// Расстояние между двумя точками на карте
f.get_distance = function(p1,p2) {
	var rad = x=>x*Math.PI/180;

	if(!(p1 instanceof Object)) throw new Error('get_distance(): p1 is '+typeof(p1));
	if(!(p2 instanceof Object)) throw new Error('get_distance(): p2 is '+typeof(p2));

	var p1_lat = p1.lat || p1.latitude;
	var p2_lat = p2.lat || p2.latitude;
	var p1_lng = p1.lng || p1.longitude;
	var p2_lng = p2.lng || p2.longitude;

	var R = 6378137;
	var dLat = rad(p2_lat - p1_lat);
	var dLng = rad(p2_lng - p1_lng);
	var a = Math.sin(dLat/2)*Math.sin(dLat/2) + Math.cos(rad(p1_lat))*Math.cos(rad(p2_lat))*Math.sin(dLng/2)*Math.sin(dLng/2);
	var c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
	var d = R*c;
	return d;
};

export default f;
