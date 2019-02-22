import React,{Component} from 'react';
import {Keyboard,Platform,Image,Modal,Picker,TouchableOpacity,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Arrow from '../../assets/ui/down_arrow.png';

const styles = EStyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        height: 50,
        marginVertical: 5, paddingHorizontal: 20,
        borderWidth: 1, borderColor: '#ccc',
        borderRadius: 100,
        backgroundColor: '#fff',
    },
    container_active: {
        justifyContent: 'center',
        height: 50,
        marginVertical: 5, paddingHorizontal: 20,
        borderWidth: 1, borderColor: '#ccc',
        borderRadius: 100,
        backgroundColor: '#fff',
    },
    container_error: {
        borderColor: '#f40000',
    },
    title: {
        marginTop: 8,
        color: '#bbb',
        fontSize: 10, fontFamily: 'GothamPro',
        lineHeight: 12,
    },
    title_active: {
        marginTop: 0, paddingTop: Platform.select({ ios: 3, android: 0 }),
        fontSize: 14, fontFamily: 'GothamPro',
        lineHeight: 18,
    },
    input: {
        width: '100%',
        ...Platform.select({ ios: {}, android: { margin: -4 } }),
        paddingTop: 4, paddingBottom: 5,
        fontSize: 14, fontFamily: 'GothamPro-Medium',
    },
    arrow: {
		height: 20, width: 20,
		marginRight: 10,
		color: 'red',
	},
    error_text: {
        marginLeft: 20, marginBottom: 10, paddingTop: Platform.select({ ios: 3, android: 0 }),
        fontSize: 14, fontFamily: 'GothamPro',
        color: '#f40000',
    },
	modal_area: {
		flex: 1,
		justifyContent: 'flex-end',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	select_area: {
		alignItems: 'center',
		padding: 20,
		borderTopWidth: 1, borderColor: '#888',
		backgroundColor: '#fff',
	},
	select_text: {
		paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 16, fontFamily: 'GothamPro',
	},
	item: {
		fontSize: 16, fontFamily: 'GothamPro',
	},
	scroll: {
		backgroundColor: '#eee',
	},
});

export default class SelectCenter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			value: props.value ?? 0,
			error: props.error,
		};
	}

	componentDidUpdate(prev_props) {
		if(!Object.is(prev_props,this.props)) {
			this.setState(state => ({
				value: state.value || this.props.value || 0,
				error: this.props.error,
			}));
		}
	}

	open  = () => {
		Keyboard.dismiss();
		if(this.props.data.length) this.setState({active:true});
	}
	close = () => this.setState({active:false});

	select = (value) => {
		this.setState({value});
		this.props.update(value);
	}

	ios_picker = () => (
		<Modal
			visible={this.state.active}
			transparent={true}
			animationType='none'
			style={styles.modal}
		>
			<TouchableOpacity style={styles.modal_area} onPress={this.close}>
				<TouchableOpacity style={styles.select_area} onPress={this.close}>
					<Text style={styles.select_text}>Выбрать</Text>
				</TouchableOpacity>
				<View style={styles.scroll}>
					<Picker
						selectedValue={this.state.value}
						onValueChange={(value,i) => this.select(value)}
						itemStyle={styles.item}
					>
						<Picker.Item value={0} label='Выберите центр выдачи' />
						{this.props.data.map((e,i) => (<Picker.Item key={i} value={e.id} label={e.title} />))}
					</Picker>
				</View>
			</TouchableOpacity>
		</Modal>
	);

	android_picker = () => (
		<Picker
			mode="dialog"
			prompt="Выберите центр выдачи"
			selectedValue={this.state.value}
			onValueChange={(value,i) => this.select(value)}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				opacity: 0,
			}}
			itemStyle={styles.item}
		>
			<Picker.Item value={-1} label='Выберите центр выдачи' />
			{this.props.data.map((e,i) => (<Picker.Item key={i} value={e.id} label={e.title} />))}
		</Picker>
	);

	render() {
		let {props,state} = this;

		return (
			<View>
				<TouchableOpacity onPress={this.open_picker}>
					{state.value ? (
						<View style={[styles.container_active, props.error ? styles.container_error : {}]}>
							<Text style={styles.title}>{props.title}</Text>
							<Text style={styles.input} numberOfLines={1}>{state.value}</Text>
						</View>
					) : (
						<View style={[styles.container, props.error ? styles.container_error : {}]}>
							<Text style={[styles.title, styles.title_active]}>{props.title}</Text>
							<Arrow style={styles.arrow} />
						</View>
					)}
				</TouchableOpacity>
				{state.error ? (<Text style={styles.error_text}>{props.error}</Text>) : null}
				{Platform.OS == 'ios'		? this.ios_picker()		: null}
				{Platform.OS == 'android'	? this.android_picker()	: null}
			</View>
		);
å	}
}