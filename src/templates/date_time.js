import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between', alignItems: 'center',
	},
	container_date: {
		flexDirection: 'row',
		justifyContent: 'space-between', alignItems: 'center',
		minHeight: 65,
		marginVertical: 5, paddingHorizontal: 25,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		backgroundColor: '#fff',
		flex: 3
	},
	container_time: {
		flexDirection: 'row',
		justifyContent: 'space-between', alignItems: 'center',
		minHeight: 65,
		marginVertical: 5, paddingHorizontal: 25,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		backgroundColor: '#fff',
		flex: 2,
		marginLeft: 10
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

export default class DateTime extends Component {
	constructor(props) {
		super(props);

		this.input = React.createRef();

		this.state = {
			active: !!(props.value?.length),
			value: props.value ?? '',
			error: props.error,
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
					<View style={styles.wrapper}>
						<View style={[styles.container_date,state.error?styles.container_error:{}]}>
							<View>
								<Text style={styles.title}>Дата</Text>
								<TextInput
									ref={this.input}
									style={styles.input}
									secureTextEntry={this.props.password}
									value={state.value}
									keyboardType={this.props.type}
									onChangeText={this.set_value}
									onBlur={this.reset_active}
								/>
							</View>
							<Icon name="check" style={{color: '#7ED321'}} size={25} />
							/* <DateTimePicker
								isVisible={this.state.isDateTimePickerVisible}
								onConfirm={this.handleDatePicked}
								onCancel={this.hideDateTimePicker}
								mode="date"
								ref="dataPicker"
							/> */
						</View>
						<View style={[styles.container_time,state.error?styles.container_error:{}]}>
							<View>
								<Text style={styles.title}>Время</Text>
								<TextInput
									ref={this.input}
									style={styles.input}
									secureTextEntry={this.props.password}
									value={state.value}
									keyboardType={this.props.type}
									onChangeText={this.set_value}
									onBlur={this.reset_active}
								/>
							</View>
							<Icon name="check" style={{color: '#7ED321'}} size={25} />
							/* <DateTimePicker
								isVisible={this.state.isDateTimePickerVisible}
								onConfirm={this.handleDatePicked}
								onCancel={this.hideDateTimePicker}
								mode="time"
								ref="timePicker"
							/> */
						</View>
					</View>
				) : (
					<View style={styles.wrapper}>
						<TouchableOpacity style={[styles.container_date, state.error?styles.container_error:{}]} onPress={this.set_active}>
							<Text style={[styles.title,styles.title_active]}>Дата</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.container_time, state.error?styles.container_error:{}]} onPress={this.set_active}>
							<Text style={[styles.title,styles.title_active]}>Время</Text>
						</TouchableOpacity>
					</View>
				)}
				{state.error ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
			</View>
		);
	}
}
