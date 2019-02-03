import React,{Component} from 'react';
import {Platform,TouchableOpacity,TextInput,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {TextInputMask} from 'react-native-masked-text';
import {withNavigation} from 'react-navigation';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'center',
		height: 50,
		marginVertical: 5, paddingHorizontal: 20,
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
	error_text: {
		marginLeft: 20, marginBottom: 10, paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 14, fontFamily: 'GothamPro',
		color: '$red',
	},
});

export default withNavigation(class InputCard extends Component {
	constructor(props) {
		super(props);

		this.input = this.props.id ?? React.createRef();

		this.state = {
			active: !!(props.value?.length),
			value: props.value ?? '',
			error: props.error,
		};
	}

	componentDidUpdate(prev_props) {
		if(!Object.is(prev_props,this.props)) {
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
				{state.active ? (
					<View style={[styles.container,state.error?styles.container_error:{}]}>
						<Text style={styles.title}>{this.props.title}</Text>
						{props.disabled ? (
							<Text style={[styles.input,props.style]}>{state.value}</Text>
						) : (
							<TextInputMask
								ref={this.input}
								style={[styles.input,props.style]}
								value={state.value}
								disabled={props.disabled}
								keyboardType="number-pad"
								onFocus={this.scroll}
								onChangeText={this.set_value}
								onBlur={this.reset_active}
								type={'custom'}
								options={{mask:'9999 9999 9999 9999'}}
							/>
						)}
					</View>
				) : (
					<TouchableOpacity style={[styles.container,state.error?styles.container_error:{}]} onPress={this.set_active}>
						<Text style={[styles.title,styles.title_active]}>{this.props.title}</Text>
					</TouchableOpacity>
				)}
				{state.error.length ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
			</View>
		);
	}
});
