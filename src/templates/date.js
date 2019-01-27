import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
	container: {
		flex: 1, flexDirection: 'row',
		justifyContent: 'space-between', alignItems: 'center',
		minHeight: 65,
		marginVertical: 5, paddingHorizontal: 25,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		backgroundColor: '#fff',
	},
	container_error: {
		borderColor: 'red',
	},
	title: {
		marginTop: 10,
		color: '#bbb',
		fontSize: 14,
	},
	title_active: {
		marginTop: 0,
		fontSize: 20,
	},
	input: {
		width: '100%',
		marginBottom: 8, paddingVertical: 3,
		fontSize: 18,
	},
	error_text: {
		marginLeft: 20, marginBottom: 10,
		fontSize: 14,
		color: 'red',
	},
});

export default class Date extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			active: !!props.value?.length,
			value: props.value ?? '',
			error: props.error,
		};
	}

	componentDidUpdate(prevProps) {
		if(!Object.is(this.props,prevProps)) {
			this.setState(state => ({
				active: state.active || !!this.props.value?.length,
				value: ((this.props.value!=state.value) ? this.props.value : (this.props.value || '')),
				error: this.props.error,
			}));
		}
	}
	change_picker = (value) => {
		this.setState({visible:value});
	}
	set_value = (date) => {
		const day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
		const month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
		const year = date.getFullYear();
		const selectedDate = day+' . '+month+' . '+year;

		//this.setState({active:true, value:selectedDate, error:false, visible:false});
		this.change_picker(false);
		this.props.update(selectedDate);
	}
	clear_value = () => {
		this.setState({ active:false, value:'', error:false, visible:false});
		this.props.update('');
	}
	
	render() {
		let state = this.state;
		console.log('date_this',this);
		return (
			<View style={this.props.style}>
				{state.active ? (
					<View style={[styles.container,state.error?styles.container_error:{}]}>
						<View>
							<Text style={styles.title}>Дата</Text>
							<TextInput
								style={styles.input}
								value={state.value}
								onFocus={() => this.change_picker(true)}
							/>
						</View>
						<Icon name="check" style={{color: '#7ED321'}} size={25} />
					</View>
				) : (
					<TouchableOpacity style={[styles.container,state.error?styles.container_error:{}]} onPress={() => this.change_picker(true)}>
						<Text style={[styles.title,styles.title_active]}>Дата</Text>
					</TouchableOpacity>
				)}
				{(state.error && state.error!='пусто') ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
				<DateTimePicker
					isVisible={state.visible}
					onConfirm={this.set_value}
					onCancel={() => this.change_picker(false)}
				/>
			</View>
		);
	}
}