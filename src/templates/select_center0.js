import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Text, View, Keyboard, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/EvilIcons';
import ModalFilterPicker from 'react-native-modal-filter-picker';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between', alignItems: 'center',
		height: 50,
		marginVertical: 5, paddingHorizontal: 20,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		backgroundColor: '#fff',
	},
	container_active: {
		justifyContent: 'center',
		height: 50,
		marginVertical: 5, paddingHorizontal: 20,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		backgroundColor: '#fff',
	},
	container_error: {
		borderColor: '#f40000',
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
		fontSize: 14, fontFamily: 'GothamPro-Medium',
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
	modal_input: {
		fontSize: 14, lineHeight: 18, fontFamily: 'GothamPro-Medium',
		paddingHorizontal: 20, paddingVertical: 15,
	},

	modal_option: {
		fontSize: 14, lineHeight: 18, fontFamily: 'GothamPro-Medium',
		paddingHorizontal: 20, paddingVertical: 15,

		flex: 0, flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingTop: 0, paddingBottom: 0,
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	modal_cancel: {
		alignSelf: 'center',
		paddingHorizontal: 30, paddingVertical: 15,
		borderRadius: 100,
		backgroundColor: '$red',
	},
	modal_cancel_text: {
		color: '#fff', fontFamily: 'GothamPro-Medium',
		fontSize: 16, lineHeight: 19,
	},
});

export default class SelectCenter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			picker: true,
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
	open_picker		= () => this.setState({picker: true});
	close_picker	= () => this.setState({picker: false});

	select = (value) => {
		console.log(value);
		//this.setState({value, error:false});
		this.close_picker();
		this.props.update(value);
	}

	render() {
		let {state,props} = this;
		return (
			<View>
				<TouchableOpacity onPress={this.open_picker}>
					{state.value ? (
						<View style={[styles.container_active, props.error ? styles.container_error : {}]}>
							<Text style={styles.title}>{props.title}</Text>
							<Text style={styles.input} numberOfLines={1}>{state.value}</Text>
						</View>
					) : (
						<View style={[styles.container, props.error ? styles.container_error : {}]}>
							<Text style={[styles.title, styles.title_active]}>{props.title}</Text>
							<Text styles={styles.right}><Icon name="chevron-down" style={{ color: 'red'}} size={25} /></Text>
						</View>
						)}
				</TouchableOpacity>
				{state.error ? (<Text style={styles.error_text}>{props.error}</Text>) : null}
				<ModalFilterPicker
					visible={state.picker}
					onSelect={this.select}
					onCancel={this.close_picker}
					options={props.data}
					placeholderText="Начните набирать текст..."
					noResultsText="Ничего не найдено"
					cancelButtonText="Отмена"
					title={props.title}
					modal={{transparent: true, animationType: "slide"}}
					overlayStyle={styles.modal}
					filterTextInputStyle={styles.modal_input}
					cancelButtonStyle={styles.modal_cancel}
					cancelButtonTextStyle={styles.modal_cancel_text}
					//listContainerStyle={styles.modal_option_container}
					optionTextStyle={styles.modal_option}
				/>
			</View>
		);
	}
}