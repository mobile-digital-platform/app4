import React,{Component} from 'react';
import {Platform,TouchableOpacity,TextInput,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

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
		...Platform.select({ios:{},android:{margin:-4}}),
		paddingTop: 4, paddingBottom: 5,
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
	input_disabled: {
		color: '#b3b3b3',
	},
	error_text: {
		marginLeft: 25, marginBottom: 10, paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 14, fontFamily: 'GothamPro',
		color: '$red',
	},
});

export default class Input extends Component {
	constructor(props) {
		super(props);

		this.input = this.props.id ?? React.createRef();

		this.state = {
			active: !!(props.value?.length),
			value: props.value ?? '',
			error: props.error ?? '',
		};
	}

	componentDidUpdate(prev_props) {
		if(!Object.is(prev_props,this.props)) {
			if(this.props.clear) {
				this.setState({
					active: 0,
					value: '',
					error: '',
				});
			} else {
				this.setState(state => ({
					active: state.active || this.props.value?.length,
					value: ((this.props.value!=state.value) ? this.props.value : (this.props.value || '')),
					error: this.props.error,
				}));
			}
		}
	}

	set_value = (value) => {
		this.setState({value,error:false});
		if(this.props.update) this.props.update(value);
	}

	set_active = async () => {
		if(this.props.disabled) return;

		await this.setState({active:true});
		this.input.current.focus();

		this.scroll();
	}
	reset_active = () => {
		if(!this.state.value?.length) this.setState({active:false});
		if(this.props.send) this.props.send(this.state.value);
	}

	scroll = () => {
		if(this.props.keyboard_options) {
			this.props.keyboard_options.scroll.current.scrollTo({y:this.props.keyboard_options.offset});
		}
	}

	render() {
		let {props,state} = this;

		return (
			<View>
				{state.active ? (
					<TouchableOpacity style={[styles.container,state.error?styles.container_error:{}]} onPress={this.set_active}>
						<Text style={styles.title}>{props.title}</Text>
						<TextInput
							ref={this.input}
							style={[styles.input,props.disabled?styles.input_disabled:{},props.style]}
							keyboardType={this.props.type}
							value={state.value}
							editable={!props.disabled}
							maxLength={props.size}
							onFocus={_=>{this.scroll();this.setState({active:true})}}
							onChangeText={this.set_value}
							onBlur={this.reset_active}
							{...props}
						/>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={[styles.container,state.error?styles.container_error:{}]} onPress={this.set_active}>
						<Text style={[styles.title,styles.title_active]}>{props.title}</Text>
					</TouchableOpacity>
				)}
				{state.error?.length ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
			</View>
		);
	}
}
