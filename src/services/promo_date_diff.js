export default (data) => {
	if(!(data instanceof Object)) return {};
	
	let now		= +new Date(),
		start	= +new Date(data.start),
		end		= +new Date(data.end);

	if(end < now) {
		data.diff_text = 'Акция закончилась';
		data.can_participate = false;
	} else {
		if(now < start) {
			data.diff = Math.ceil((start-now)/(24*60*60*1000));
		} else {
			data.diff = Math.ceil((end-now)/(24*60*60*1000));
		}

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
		if(now < start) {
			data.diff_text = 'начинается '+data.diff_text;
		} else {
			data.diff_text = 'Заканчивается '+data.diff_text;
		}

	}
	return data;
}
