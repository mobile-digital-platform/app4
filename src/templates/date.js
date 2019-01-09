import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
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
			}));
		}
	}

	showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  	hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  	handleDatePicked = (date) => {
		console.log('A date has been picked: ', date);
		this.hideDateTimePicker();
	};

	set_value = (value) => {
		this.setState({value,error:false});
		if(this.props.update) this.props.update(value);
	}

	set_active = async () => {
		await this.setState({active:true});
		this.input.current.focus();

		if(this.props.keyboard_options) {
			this.props.keyboard_options.scroll.current.scrollTo({x:0,y:this.props.keyboard_options.offset,animated:true});
		}
		this.showDateTimePicker();
	}
	reset_active = () => {
		if(!this.state.value.length) this.setState({active:false});
		if(this.props.send) this.props.send(this.state.value);
	}

	render() {
		let state = this.state;

		return (
			<View>
				{state.active ? (
					<View style={[styles.container,state.error?styles.container_error:{}]}>
						<Text style={styles.title}>{this.props.title}</Text>
						<TextInput
							ref={this.input}
							style={styles.input}
							secureTextEntry={this.props.password}
							value={state.value}
							keyboardType={this.props.type}
							onChangeText={this.set_value}
							onBlur={this.reset_active}
						/>
						<DateTimePicker
							isVisible={this.state.isDateTimePickerVisible}
							onConfirm={this.handleDatePicked}
							onCancel={this.hideDateTimePicker}
						/>
					</View>
				) : (
					<TouchableOpacity style={[styles.container,state.error?styles.container_error:{}]} onPress={this.set_active}>
						<Text style={[styles.title,styles.title_active]}>{this.props.title}</Text>
					</TouchableOpacity>
				)}
				{state.error ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
			</View>
		);
	}
}