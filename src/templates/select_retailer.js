import React,{Component} from 'react';
import {Platform,StyleSheet,Modal,Picker,TouchableOpacity,Text,View} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 65,
		marginVertical: 5, paddingLeft: 25, paddingRight: 5,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		backgroundColor: '#fff',
	},
	container_error: {
		borderColor: '#f40000',
	},
	left: {
		flex: 1,
	},
	title: {
		marginTop: 10, paddingTop: Platform.select({ios:3,android:0}),
		// backgroundColor: '#eee',
		color: '#bbb',
		fontSize: 14, fontFamily: 'GothamPro',
	},
	title_active: {
		marginTop: 0, paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 18, fontFamily: 'GothamPro',
	},
	input: {
		width: '100%',
		paddingVertical: 3,
		fontSize: 18, fontFamily: 'GothamPro',
	},
	right: {
		width: 20,
		textAlign: 'right',
	},
	error_text: {
		marginLeft: 20, marginBottom: 10, paddingTop: Platform.select({ios:3,android:0}),
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
		fontSize: 20, fontFamily: 'GothamPro',
	},
	item: {
		fontFamily: 'GothamPro',
	},
	scroll: {
		backgroundColor: '#eee',
	},
});

export default class SelectRetailer extends Component {
	constructor(props) {
		super(props);

		console.log(props);

		this.state = {
			active: false,
			value: props.value ?? -1,
			error: props.error,
		};
	}

	componentDidUpdate(prevProps) {
		if(!Object.is(this.props,prevProps)) {
			this.setState(state => ({
				value: state.value || this.props.value || -1,
				error: this.props.error,
			}));
		}
	}

	open  = () => this.setState({active:true});
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
						<Picker.Item value={-1} label='Выберите торговую сеть' />
						{this.props.data.map((e,i) => (<Picker.Item key={i} value={e.id} label={e.title} />))}
					</Picker>
				</View>
			</TouchableOpacity>
		</Modal>
	);

	android_picker = () => (
		<Picker
			mode="dialog"
			prompt="Торговая сеть"
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
			<Picker.Item value={-1} label='Выберите торговую сеть' />
			{this.props.data.map((e,i) => (<Picker.Item key={i} value={e.id} label={e.title} />))}
		</Picker>
	);

	render() {
		let state = this.state;
		let props = this.props;

		return (
			<View>
				<TouchableOpacity style={[styles.container,props.error?styles.container_error:{}]} onPress={this.open}>
					<View style={styles.left}>
						<Text style={styles.input} numberOfLines={1}>{props.data.find(e => e.id==state.value)?.title ?? 'Выберите торговую сеть'}</Text>
					</View>
					<Text styles={styles.right}><Icon name="chevron-down" style={{color:'red'}} size={40}/></Text>
				</TouchableOpacity>
				{props.error ? (<Text style={styles.error_text}>{props.error}</Text>) : null}
				{Platform.OS == 'ios'		? this.ios_picker()		: null}
				{Platform.OS == 'android'	? this.android_picker()	: null}
			</View>
		);
	}
}
