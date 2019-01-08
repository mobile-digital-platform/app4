import config		from '../../config';

export const ReducerRecord = () => ({
	visible: false,
});

// Постоянные
export const module	= 'smoke';

export const OPEN	= config.name+'/'+module+'/OPEN';
export const CLOSE	= config.name+'/'+module+'/CLOSE';

// Редуктор
export default function reducer(st = ReducerRecord(),action) {
	const {type,payload,error} = action;

	if(type == OPEN) {
		return {visible:true};
	} else if(type == CLOSE) {
		return {visible:false};
	}

	return ReducerRecord();
}

// Действия
export const open_smoke  = (payload) => ({type:OPEN});
export const close_smoke = (payload) => ({type:CLOSE});
