import React,{Component} from 'react';
import {FlatList,ImageBackground,Keyboard,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Input			from '../../../../templates/input';
import DateInput		from '../../../../templates/input_date';
import SelectAddress	from '../../../../templates/select_address';
import SubTitle			from '../../../../templates/subtitle';

const styles = EStyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#fff',
	},

	address_title: {
		paddingHorizontal: 20,
	},
	address: {
		flex: 1,
		height: 110, width: '100%',
		marginVertical: 5,
		paddingHorizontal: 25, paddingHorizontal: 20,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 20,
		backgroundColor: '#fff',
	},
	address_text: {
		marginTop: 20,
		paddingBottom: 8,
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		textAlign: 'center',
		lineHeight: 18,
	},

	button: {
		alignItems: 'center',
		width: '100%',
		marginVertical: 20, padding: 15,
		borderRadius: 100,
		backgroundColor: '#ddd',
	},
	button_text: {
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
		lineHeight: 19,
	},

	active_button: {
		backgroundColor: '$red',
	},
	active_button_text: {
		color: '#fff',
	},
	passive_button: {
		backgroundColor: '#f1f1f1',
	},
	passive_button_text: {
		color: '#d5d5d5',
	},
});

export default withNavigation(class GetPrizeAddressLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tint:	'',
			ready:	props.user.address_obj.full.length,
		};
	}

	componentDidMount() {
		if(this.props.user.address_obj.full.length && !this.props.user.address_obj.apartment) {
			this.setState({tint:'Укажите квартиру, если есть'});
		}
	}
	componentDidUpdate(prev_props) {
		// Если там он указал адрес без квартиры, то указываем на это
		if(
			prev_props.user.address_obj.full != this.props.user.address_obj.full &&
			this.props.user.address_obj.full.length
		) {
			this.setState({ready:true});
			if(!this.props.user.address_obj.apartment) {
				this.setState({tint:'Укажите квартиру, если есть'});
			} else if(this.state.tint.length) {
				this.setState({tint:''});
			}
		}
	}

	send = async () => {
		if(!this.props.user.address_obj.full.length) {
			await alert("Укажите адрес доставки");
			return;
		}
		// Ничего не отправляем, потому что все и так уже исправлено
		await this.props.next();
	}

	render() {
		let {props,state} = this;

		let button_styles = [
			styles.button,
			state.ready ? styles.active_button : styles.passive_button,
		];
		let button_text_styles = [
			styles.button_text,
			state.ready ? styles.active_button_text : styles.passive_button_text,
		];

		return (
			<ScrollView ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={styles.container}>
				<View style={styles.address_area}>
					<SubTitle style={styles.address_title} text="Адрес доставки" />
					<SelectAddress
						title="Укажите адрес доставки"
						value={props.user.address_obj.full}
						disabled={props.accessible_address}
						error={state.tint}
					/>
					{/*
					<Text style={styles.address_text}>
						Текст, описывающий особенности получения выигрыша, правила и какие-то хитрости. Может занимать несколько строчек.
					</Text>
					*/}
					<TouchableOpacity style={button_styles} onPress={this.send}>
						<Text style={button_text_styles}>Дальше</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
})
