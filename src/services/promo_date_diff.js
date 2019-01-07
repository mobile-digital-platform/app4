export default (data) => {
	data.diff = Math.ceil(((+new Date(data.end))-(+new Date()))/(24*60*60*1000));
	if(data.diff >= 0) {
		if(data.diff == 0) {
			data.diff_text = 'сегодня';
		} else if(data.diff == 1) {
			data.diff_text = 'завтра';
		} else {
			let day = 'день';
			if(data.diff > 1 && data.diff < 5)													day = 'дня';	// от 2 до 4
			else if(data.diff == 0 || data.diff > 4 && data.diff < 21)							day = 'дней';	// от 5 до 20 и 0
			else if(data.diff.toString().substr(-1) > 1 && data.diff.toString().substr(-1) < 5)	day = 'дня';	// с последней цифрой от 2 до 5
			else if(data.diff.toString().substr(-1) != 1)										day = 'дней';	// с последней цифрой 0 и от 6 до 9

			data.diff_text = 'через '+data.diff+' '+day;
		}
		data.diff_text = 'Заканчивается '+data.diff_text;
	} else {
		data.diff_text = 'Акция закончилась';
		data.can_participate = false;
	}
	return data;
}
