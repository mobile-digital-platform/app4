import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Text, View, Keyboard, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import ModalFilterPicker from 'react-native-modal-filter-picker';

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
	left: {
		flex: 1,
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
	right: {
		width: 20,
		textAlign: 'right',
	},
	error_text: {
		marginLeft: 20, marginBottom: 10, paddingTop: Platform.select({ ios: 3, android: 0 }),
		fontSize: 14, fontFamily: 'GothamPro',
		color: '#f40000',
	},
	modal: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.8)',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal_option:{
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		paddingLeft: 15,
	},
	modal_cancel_button: {
		alignSelf: 'center',
		paddingHorizontal: 30, paddingVertical: 15,
		borderRadius: 100,
		backgroundColor: 'red',
	},
	modal_cancel_text: {
		color: '#fff',
		fontSize: 20,
	},
});

export default class Date extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			value: props.value ?? '',
			error: props.error,
		};
	}

	componentDidUpdate(prevProps) {
		if (!Object.is(this.props, prevProps)) {
			this.setState(state => ({
				value: ((this.props.value != state.value) ? this.props.value : (this.props.value || '')),
				error: this.props.error,
			}));
		}
	}
	change_picker = (value) => {
		this.setState({visible: value});
	}
	set_value = (value) => {
		//this.setState({value, error:false, visible:false});
		this.change_picker(false);
		this.props.update(value);
	}
	clear_value = () => {
		this.setState({value: '', error: false, visible: false });
		this.props.update('');
	}

	render() {
		let state = this.state;
		let props = this.props;
		return (
			<View>
				<TouchableOpacity style={[styles.container, props.error ? styles.container_error : {}]} onPress={_ => this.change_picker(true)}>
					<View style={styles.left}>
						{state.value ? (
							<View>
								<Text style={styles.title}>{props.title}</Text>
								<Text style={styles.input} numberOfLines={1}>{state.value}</Text>
							</View>
						) : (
								<Text style={[styles.title, styles.title_active]}>{props.title}</Text>
							)}
					</View>
					<Text styles={styles.right}><Icon name="chevron-down" style={{ color: 'red' }} size={40} /></Text>
				</TouchableOpacity>
				{state.error ? (<Text style={styles.error_text}>{prstateops.error}</Text>) : null}
				<ModalFilterPicker
					visible={state.visible}
					onSelect={this.set_value}
					onCancel={_ => this.change_picker(false)}
					options={props.data}
					placeholderText="Начните набирать текст..."
					noResultsText="Ничего не найдено"
					cancelButtonText="Отмена"
					title={props.title}
					modal={{transparent: true, animationType: "slide"}}
					overlayStyle={styles.modal}
					filterTextInputStyle={{fontSize: 18, paddingLeft: 20}}
					cancelButtonStyle={styles.modal_cancel_button}
					cancelButtonTextStyle={styles.modal_cancel_text}
					//optionTextStyle={styles.modal_option}
				/>
			</View>
		);
	}
}