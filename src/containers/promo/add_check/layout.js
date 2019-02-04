import React,{Component} from 'react';
import {Keyboard,FlatList,Image,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import QRIcon		from '../../../../assets/ui/qr.png';
import CameraImage	from '../../../../assets/ui/camera.png';

import SubTitle		from '../../../templates/subtitle';
import Input		from '../../../templates/input';
import DateInput	from '../../../templates/input_date';
import TimeInput	from '../../../templates/input_time';

import Photo		from '../../../templates/scan';
import Camera		from '../../../templates/camera';
import QR_Scanner	from '../../../templates/qr_scanner';

const styles = EStyleSheet.create({
	container: {
	},

	photo_area: {
		padding: 20,
	},
	text: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
		textAlign: 'center',
	},
	photo_list_area: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		marginTop: 15,
	},
	camera_area: {
		marginHorizontal: 5,
	},
	camera: {
		height: 90, width: 90,
		borderRadius: 18,
	},
	photo_error: {
		marginTop: 15,
		fontSize: 14,
		color: '$red',
		textAlign: 'center',
	},

	data_area: {
		paddingTop: 25, paddingHorizontal: 20,
		borderTopWidth: 1, borderTopColor: '#ddd',
	},
	title: {
		paddingHorizontal: 25, paddingVertical: 0,
	},
	scan: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 40, width: 240,
		marginTop: 5, marginBottom: 15, marginHorizontal: 20,
		borderRadius: 100,
		backgroundColor: '$red',
	},
	scan_image: {
		height: 12, width: 12,
	},
	scan_text: {
		marginLeft: 5, paddingTop: 2,
		color: '#fff',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
	date_time: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	date: {
		width: 150,
	},
	time: {
		width: 120,
	},

	save: {
		alignItems: 'center',
		marginTop: 15, marginBottom: 30, marginHorizontal: 20,
		padding: 15,
		borderRadius: 100,
	},
	save_text: {
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		lineHeight: 19,
	},
	active_button: {
		backgroundColor: '$red',
	},
	active_button_text: {
		color: '#fff',
	},
	passive_button: {
		backgroundColor: '#f1f1f1',
	},
	passive_button_text: {
		color: '#d5d5d5',
	},
});

export default class PromoAddCheckLayout extends Component {
	constructor(props) {
		super(props);

		this.scroll = React.createRef();
		this.inputs = {
			sum: {
				ref: React.createRef(),
				offset: 300,
			},
			fn: {
				ref: React.createRef(),
				offset: 360,
			},
			fd: {
				ref: React.createRef(),
				offset: 420,
			},
			fp: {
				ref: React.createRef(),
				offset: 480,
			},
		};

		this.required = ['date','time','sum','fn','fd','fp'];

		this.state = {
			camera_opened:	false,
			scanner_opened:	false,

			photo_list: [],
			photo_error: '',

			datetime:	'',
			date:		'',
			time:		'',
			sum:		'123',
			fn:			'123',
			fd:			'123',
			fp:			'123',

			date_error:	false,
			time_error:	false,
			sum_error:	false,
			fn_error:	false,
			fd_error:	false,
			fp_error:	false,

			updated: false,
			waiting: false,
			ready: false,
		};
	}

	// Камера
	open_camera		= () => this.setState({camera_opened:true});
	close_camera	= () => this.setState({camera_opened:false});

	// Сканер qr кода
	open_scanner	= () => this.setState({scanner_opened:true});
	close_scanner	= () => this.setState({scanner_opened:false});

	// Фотографии
	add_photo		= (data) => this.setState(({photo_list}) => ({photo_list:[...photo_list,data],photo_error:''}));
	remove_photo	= (id)   => this.setState(({photo_list}) => ({photo_list:photo_list.filter(item => item.id!=id)}));

	// Дата и время
	set_date = (date) => this.setState(state => ({datetime:new Date(date+' '+state.time),date,date_error:false,updated:true}));
	set_time = (time) => this.setState(state => ({datetime:new Date(state.date+' '+time),time,time_error:false,updated:true}));

	// Все остальные поля
	update = async (adjust) => {
		await this.setState({...adjust,updated:true});

		// Убираем ошибки
		for(let field of this.required) if(this.state[field+'_error'] && this.state[field].length) {
			this.setState({[field+'_error']:false});
		}
	}

	// Указание на ошибки при заполнении полей
	check_completeness = async () => {
		let state = this.state;

		if(!state.photo_list.length) {
			this.setState({photo_error:'Прикрепите фотографию чека!',ready:false});
			this.scroll.current.scrollTo({y:0});
			await this.setState({ready:false});
			return false;
		}

		// Указываем на то, что не заполнено
		// let ready = this.required.every(field => state[field].length);
		// for(let field of this.required) {
		// 	this.setState({[field+'_error']:!state[field].length});
		// 	if(!state[field].length) {
		// 		if(this.inputs[field]) this.scroll.current.scrollTo({y:this.inputs[field].offset});
		// 		await this.setState({ready:false});
		// 		return false;
		// 	}
		// }
		await this.setState({ready:true});
		return true;
	}

	send_data = async () => {
		let state = this.state;

		Keyboard.dismiss();
		if(state.waiting) return;

		// Проверяем все поля
		if(!await this.check_completeness()) return;

		// Отправляем изменения
		await this.setState({waiting:true});
		await this.props.send_data({
			photo_list:	state.photo_list,
			datetime: 	state.datetime,
			sum: 		state.sum,
			fn: 		state.fn,
			fd: 		state.fd,
			fp: 		state.fp,
		});
		await this.setState({updated:false,waiting:false});
	}

	render() {
		let {props,state} = this;

		return (
			<ScrollView ref={this.scroll} style={styles.container} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
				<View style={styles.photo_area}>
					<Text style={styles.text}>
						Сфотографируйте чек так, чтобы были видны название магазина, список товаров, сумма, дата, фискальные данные (ФН, ФД, ФП), и QR-код.
					</Text>
					<View style={styles.photo_list_area}>
						{state.photo_list[0] ? (<Photo photo={state.photo_list[0]} remove={this.remove_photo} />) : null}
						{state.photo_list[1] ? (<Photo photo={state.photo_list[1]} remove={this.remove_photo} />) : null}
						{state.photo_list[2] ? (<Photo photo={state.photo_list[2]} remove={this.remove_photo} />) : null}
						{state.photo_list.length<3 ? (
							<TouchableOpacity style={styles.camera_area} onPress={this.open_camera}>
								<Image style={styles.camera} source={CameraImage} />
							</TouchableOpacity>
						) : null}
					</View>
					{state.photo_error ? (<Text style={styles.photo_error}>{state.photo_error}</Text>) : null}
				</View>

				<View style={styles.data_area}>
					<SubTitle style={styles.title} text="Фискальные данные чека" />
					<TouchableOpacity style={styles.scan} onPress={this.open_scanner}>
						<Image style={styles.scan_image} source={QRIcon} />
						<Text style={styles.scan_text}>Сканировать QR-код</Text>
					</TouchableOpacity>
					<View style={styles.date_time}>
						<View style={styles.date}>
							<DateInput
								title="Дата"
								value={state.date}
								update={this.set_date}
								error={state.date_error}
							/>
						</View>
						<View style={styles.time}>
							<TimeInput
								title="Время"
								value={state.time}
								update={this.set_time}
								error={state.time_error}
							/>
						</View>
					</View>
					<Input
						id={this.inputs.sum.ref}
						title="Сумма"
						type="numeric"
						value={state.sum}
						update={sum => this.update({sum})}
						error={state.sum_error}
						keyboard_options={{
							scroll: this.scroll,
							offset: this.inputs.sum.offset,
						}}
					/>
					<Input
						id={this.inputs.fn.ref}
						title="ФН"
						type="numeric"
						value={state.fn}
						update={fn => this.update({fn})}
						error={state.fn_error}
						keyboard_options={{
							scroll: this.scroll,
							offset: this.inputs.fn.offset,
						}}
					/>
					<Input
						id={this.inputs.fd.ref}
						title="ФД"
						type="numeric"
						value={state.fd}
						update={fd => this.update({fd})}
						error={state.fd_error}
						keyboard_options={{
							scroll: this.scroll,
							offset: this.inputs.fd.offset,
						}}
					/>
					<Input
						id={this.inputs.fp.ref}
						title="ФП"
						type="numeric"
						value={state.fp}
						update={fp => this.update({fp})}
						error={state.fp_error}
						keyboard_options={{
							scroll: this.scroll,
							offset: this.inputs.fp.offset,
						}}
					/>
				</View>

				<TouchableOpacity style={[styles.save,styles[(state.disabled ? 'passive' : 'active')+'_button']]} onPress={this.send_data}>
					<Text style={[styles.save_text,styles[(state.disabled ? 'passive' : 'active')+'_button_text']]}>Сохранить чек</Text>
				</TouchableOpacity>

				<Camera visible={state.camera_opened} add_photo={this.add_photo} close={this.close_camera} />
				<QR_Scanner
					visible={state.scanner_opened}
					close={this.close_scanner}
					send_data={this.add_check_data}
				 />
			</ScrollView>
		);
	}
}
