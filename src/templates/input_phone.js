import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {withNavigation} from 'react-navigation';

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
		borderColor: '#f40000',
	},
	title: {
		marginTop: 10, paddingTop: 3,
		// backgroundColor: '#eee',
		color: '#bbb',
		fontSize: 14, fontFamily: 'GothamPro',
	},
	title_active: {
		marginTop: 0, paddingTop: 3,
		fontSize: 18, fontFamily: 'GothamPro',
	},
	input: {
		width: '100%',
		marginBottom: 8,
		paddingTop: 6, paddingBottom: 3,
		fontSize: 18, fontFamily: 'GothamPro',
	},
	error_text: {
		marginLeft: 20, marginBottom: 10, paddingTop: 3,
		fontSize: 14, fontFamily: 'GothamPro',
		color: '#f40000',
	},
	confirm: {
		marginTop: 10, paddingHorizontal: 20,
	},
	confirm_text: {
		paddingTop: 3,
		color: '#bbb',
		fontSize: 16, fontFamily: 'GothamPro',
	},
	confirm_enter: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 5,
	},
	confirm_enter_text: {
		marginBottom: 3, paddingTop: 3,
		color: '#f40000',
		fontSize: 18, fontFamily: 'GothamPro-Medium',
	},
});

export default withNavigation(class InputPhone extends Component {
	constructor(props) {
		super(props);

		this.input = this.props.id || React.createRef();

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
		this.input.current._inputElement.focus();

		this.scroll();

		// console.log("XSS!");

		// console.log(this.input.current._inputElement);
		// console.log(this.props.keyboard_options.scroll.current);

		// let node = findNodeHandle(this.input.current._inputElement);
		// console.log(node);
		// UIManager.measureInWindow(node,(x,y,width,height) => console.log({x,y,width,height}));

		// let scroll = findNodeHandle(this.props.scroll.current);
		// console.log(this.props.scroll.getScrollResponder());
		// this.props.scroll.getScrollResponder().scrollResponderScrollNativeHandleToKeyboard(node,-100,true);
	}
	reset_active = () => {
		if(!this.state.value.length) this.setState({active:false});
		if(this.props.send) this.props.send(this.state.value);
	}

	scroll = () => {
		if(this.props.keyboard_options) {
			this.props.keyboard_options.scroll.current.scrollTo({y:this.props.keyboard_options.offset});
		}
	}

	render() {
		let props = this.props,state = this.state;
		let navigation = this.props.navigation;

		return (
			<View>
				{props.disabled || state.active ? (
					<View style={[styles.container,state.error?styles.container_error:{}]}>
						<Text style={styles.title}>{this.props.title}</Text>
						{props.disabled ? (
							<Text style={[styles.input,this.props.style]}>{
								'+'+props.value.substr(0,1)+'('+props.value.substr(1,3)+')'+
								props.value.substr(4,3)+'-'+props.value.substr(7,2)+'-'+props.value.substr(9,2)
								}</Text>
						) : (
							<TextInputMask
								ref={this.input}
								style={[styles.input,props.style]}
								value={state.value}
								disabled={props.disabled}
								keyboardType="phone-pad"
								onFocus={this.scroll}
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
