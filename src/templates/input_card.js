import React,{Component} from 'react';
import {Platform,StyleSheet,TouchableOpacity,TextInput,Text,View} from 'react-native';
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
		marginBottom: 8,
		paddingTop: 6, paddingBottom: 3,
		fontSize: 18, fontFamily: 'GothamPro',
	},
	error_text: {
		marginLeft: 20, marginBottom: 10, paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 14, fontFamily: 'GothamPro',
		color: '#f40000',
	},
});

export default withNavigation(class InputCard extends Component {
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
				{state.error ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
			</View>
		);
	}
});
