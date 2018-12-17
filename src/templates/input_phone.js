import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {TextInputMask} from 'react-native-masked-text'

import Icon from 'react-native-vector-icons/EvilIcons';

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
	confirm: {
		marginTop: 10, paddingHorizontal: 20,
	},
	confirm_text: {
		color: '#bbb',
		fontSize: 16,
	},
	confirm_enter: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 5,
	},
	confirm_enter_text: {
		marginBottom: 3,
		color: 'red',
		fontSize: 18, fontWeight: 'bold',
	},
});

export default withNavigation(class InputPhone extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: !!(props.value?.length),
			value: props.value ?? '',
			error: props.error,
		};

		this.input = React.createRef();
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
		this.input.current._inputElement.focus();
	}
	reset_active = () => {
		if(!this.state.value.length) this.setState({active:false});
		if(this.props.send) this.props.send(this.state.value);
	}

	render() {
		let props = this.props,state = this.state;
		let navigation = this.props.navigation;

		return (
			<View>
				{state.active ? (
					<View style={[styles.container,state.error?styles.container_error:{}]}>
						<Text style={styles.title}>{this.props.title}</Text>
						{props.disabled ? (
							<Text style={styles.input}>{state.value}</Text>
						) : (
							<TextInputMask
								ref={this.input}
								style={styles.input}
								value={state.value}
								disabled={props.disabled}
								keyboardType="phone-pad"
								onChangeText={this.set_value}
								onBlur={this.reset_active}
								type={'custom'}
								options={{mask:'+7(999)999-99-99'}}
							/>
						)}
						{/*
						<TextInput
							ref={this.input}
							style={styles.input}
							value={state.value}
							disabled={props.disabled}
							keyboardType="phone-pad"
							onChangeText={this.set_value}
							onBlur={this.reset_active}
						/>
						*/}
					</View>
				) : (
					<TouchableOpacity style={[styles.container,state.error?styles.container_error:{}]} onPress={this.set_active}>
						<Text style={[styles.title,styles.title_active]}>{this.props.title}</Text>
					</TouchableOpacity>
				)}
				{state.error ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
				{this.props.need_confirm ? (
				<View style={styles.confirm}>
					<Text style={styles.confirm_text}>Вам необходимо подтвердить номер телефона по СМС</Text>
					<TouchableOpacity style={styles.confirm_enter} onPress={_=>navigation.push('settings_confirm_phone')}>
						<Text style={styles.confirm_enter_text}>Ввести код подтверждения</Text>
						<Icon name="chevron-right" style={{color:'red'}} size={40}/>
					</TouchableOpacity>
				</View>
			) : null}
			</View>
		);
	}
});
