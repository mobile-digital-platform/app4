import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';

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
	title: {
		marginTop: 10, paddingTop: Platform.select({ ios: 3, android: 0 }),
		// backgroundColor: '#eee',
		color: '#bbb',
		fontSize: 14, fontFamily: 'GothamPro',
	},
	title_active: {
		marginTop: 0, paddingTop: Platform.select({ ios: 3, android: 0 }),
		fontSize: 18, fontFamily: 'GothamPro',
	},
	input: {
		width: '100%',
		marginBottom: 8,
		paddingTop: 6, paddingBottom: 3,
		fontSize: 18, fontFamily: 'GothamPro',
	},
	left: {
		flex: 1,
	},
	right: {
		width: 20,
		textAlign: 'right',
	},
	error_text: {
		marginLeft: 20, marginBottom: 10,
		fontSize: 14,
		color: 'red',
	},
});

export default class Time extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			value: props.value ?? '',
			error: props.error,
		};
	}

	componentDidUpdate(prevProps) {
		if(!Object.is(this.props,prevProps)) {
			this.setState(state => ({
				value: ((this.props.value!=state.value) ? this.props.value : (this.props.value || '')),
				error: this.props.error,
			}));
		}
	}
	change_picker =  (value) => {
		this.setState({visible:value});
	}
	set_value = (time) => {
		const hour = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
		const minutes = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
		const selectedTime = hour+' : '+minutes;
		
		//this.setState({value:selectedTime, error:false, visible:false});
		this.change_picker(false);
		this.props.update(selectedTime);
	}
	clear_value = () => {
		this.setState({value:'', error:false, visible:false});
		this.props.update('');
	}
	
	render() {
		let state = this.state;
		return (
			<View style={this.props.style}>
				<TouchableOpacity style={[styles.container, state.error ? styles.container_error : {}]} onPress={_ => this.change_picker(true)}>
					<View style={styles.left}>
						{state.value ? (
							<View>
								<Text style={styles.title}>{props.title}</Text>
								<Text style={styles.input}>{state.value}</Text>
							</View>
						) : (
							<Text style={[styles.title, styles.title_active]}>{props.title}</Text>
						)}
					</View>
					<Text styles={styles.right}><Icon name="check" style={{ color: '#7ED321' }} size={25} /></Text>
				</TouchableOpacity>
				{state.error ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
				<DateTimePicker
					isVisible={state.visible}
					onConfirm={this.set_value}
					onCancel={_ => this.change_picker(false)}
					mode="time"
				/>
			</View>
		);
	}
}