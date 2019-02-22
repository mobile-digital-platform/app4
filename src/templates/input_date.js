import React,{Component} from 'react';
import {Keyboard,Platform,Image,TouchableOpacity,Text,TextInput,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DateTimePicker from 'react-native-modal-datetime-picker';

import f from '../functions';

import Tick from '../../assets/ui/tick_green.png';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 50,
		marginVertical: 5, paddingLeft: 20, paddingRight: 10,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		backgroundColor: '#fff',
	},
	container_error: {
		borderColor: '$red',
	},
	title: {
		marginTop: 8,
		color: '#bbb',
		fontSize: 10, fontFamily: 'GothamPro',
		lineHeight: 12,
	},
	title_active: {
		marginTop: 0, paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 18,
	},
	input: {
		width: '100%',
		paddingTop: 4, paddingBottom: 5,
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
	left: {
		flex: 1,
	},
	right: {
	},
	right_image: {
		height: 20, width: 20,
	},
	error_text: {
		marginLeft: 20, marginBottom: 10, paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 14, fontFamily: 'GothamPro',
		color: '$red',
	},
});

export default class InputDate extends Component {
	constructor(props) {
		super(props);

		this.input = React.createRef();

		this.state = {
			visible: false,
			value: props.value ?? '',
			error: props.error ?? '',
		};
	}

	componentDidUpdate(prev_props,prev_state) {
		if(!Object.is(prev_props,this.props)) {
			if(this.props.clear) {
				this.setState({
					visible: false,
					value: '',
					error: '',
				});
			} else {
				this.setState(state => ({
					value: ((this.props.value!=state.value) ? this.props.value : (this.props.value || '')),
					error: this.props.error,
				}));
			}
		}
	}

	open  = () => {
		Keyboard.dismiss();
		this.setState({visible:true});
	}
	close = () => this.setState({visible:false});

	choose = (date) => {
		this.close();
		this.props.update(f.date("Y-m-d",date));
	}

	render() {
		let {props,state} = this;

		return (
			<View style={props.style}>
				<TouchableOpacity ref={this.input} style={[styles.container,state.error?styles.container_error:{}]} onPress={this.open}>
					<View style={styles.left}>
						{state.value ? (
						<>
							<Text style={styles.title}>{props.title}</Text>
							<Text style={styles.input}>{f.date("d.m.Y",new Date(state.value))}</Text>
						</>
						) : (
							<Text style={[styles.title,styles.title_active]}>{props.title}</Text>
						)}
					</View>
					{state.value ? (<View style={styles.right}><Image style={styles.right_image} source={Tick} /></View>) : null}
				</TouchableOpacity>
				{state.error?.length ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
				<DateTimePicker
					isVisible={state.visible}
					titleIOS='Выберите дату'
					confirmTextIOS='Выбрать'
					cancelTextIOS='Отмена'
					onConfirm={this.choose}
					onCancel={this.close}
				/>
			</View>
		);
	}
}
