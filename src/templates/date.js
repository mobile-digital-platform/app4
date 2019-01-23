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
		// backgroundColor: '#eee',
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

		this.input = React.createRef();

		this.state = {
			active: !!(props.value?.length),
			value: props.value ?? '',
			error: props.error,
			isDateTimePickerVisible: false,
		};
	}

	componentDidUpdate(prevProps) {

		if(!Object.is(this.props,prevProps)) {
			this.setState(state => ({
				active: state.active || this.props.value?.length,
				value: state.value || this.props.value || '',
				error: this.props.error,
				isDateTimePickerVisible: false,
			}));
		}
	}

	set_value = (date) => {
		const day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
		const month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
		const year = date.getFullYear();
		const selectedDate = day+' . '+month+' . '+year;
		console.log('A date has been picked: ', selectedDate);

		this.setState({active:true, value:selectedDate, error:false, isDateTimePickerVisible: false});
		console.log(this.state);
		//if(this.props.update) this.props.update(selectedDate);
	}
	clear_value = () => {
		this.setState({ active:false, value:'', error:false, isDateTimePickerVisible: false});
		//if(this.props.send) this.props.send(this.state.value);
	}
	visible_picker = (visible) => {
		this.setState({ isDateTimePickerVisible: visible});
	}

	render() {
		let state = this.state;
		console.log('time_date',this);
		return (
			<View style={this.props.style}>
				{state.active ? (
					<View style={[styles.container,state.error?styles.container_error:{}]}>
						<View>
							<Text style={styles.title}>Дата</Text>
							<TextInput
								ref="input"
								style={styles.input}
								value={state.value}
								onFocus={this.show_picker}
								//onFocus={this.scroll}
								//onChangeText={this.set_value}
								//onBlur={this.reset_active}
							/>
						</View>
						<Icon name="check" style={{color: '#7ED321'}} size={25} />
					</View>
				) : (
					<TouchableOpacity style={[styles.container,state.error?styles.container_error:{}]} onPress={() => this.visible_picker(true)}>
						<Text style={[styles.title,styles.title_active]}>Дата</Text>
					</TouchableOpacity>
				)}
				{state.error ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this.set_value}
					onCancel={() => this.visible_picker(false)}
				/>
			</View>
		);
	}
}