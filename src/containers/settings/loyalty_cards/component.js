import React,{Component} from 'react';
import {Platform,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import InputCard		from '../../../templates/input_card';
import SelectRetailer	from '../../../templates/select_retailer';

import alert			from '../../../services/alert';
import st				from '../../../services/storage';

import {request}		from '../../../redux/reducers/settings';

const styles = EStyleSheet.create({
	main: {
		padding: 20,
	},
	main_text: {
		fontSize: 14, fontFamily: 'GothamPro',
		textAlign: 'center',
		lineHeight: 18,
	},
	main_input: {
		paddingVertical: 15,
	},
	main_button: {
		marginBottom: 10, padding: 15,
		borderRadius: 40,
	},
	main_button_text: {
		fontSize: 14, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
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

export default withNavigation(class LoyaltyCardsComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			retailer_id: 0,
			retailer_name: '',
			retailer_error: '',
			number: '',
			number_error: '',
			ready: false,
		};
	}

	componentDidMount() {
		console.log(this.props);
	}

	update = async (state_adjust) => {
		await this.setState(state_adjust);

		// Убираем показ ошибок, если они исправлены
		if(this.state.number.length && this.state.number_error) this.setState({number_error:''});

		this.setState({ready:(this.state.retailer_id && this.state.number.length)});
	}
	send = async () => {
		if(!this.state.retailer_id) {
			this.setState({retailer_error:'Выберите торговую сеть'});
			return;
		}
		if(!this.state.number.length) {
			this.setState({number_error:'Введите номер карты лояльности'});
			return;
		}

		let obj = {
			retailer_id:	this.state.retailer_id,
			number:			this.state.number,
		};

		this.props.open_smoke();
		let {response,error} = await request.add_loyalty_card({
			...obj,
			user_id: this.props.user.id
		});
		if(response) {
			this.props.add_loyalty_card(obj);
			this.props.navigation.goBack();
		}
		if(error) {
			await alert("Не удалось добавить карту",error.message);
		}
		this.props.close_smoke();
	}

	render() {
		let props = this.props;
		let state = this.state;
		// console.log("LoyaltyCardsComponent",this.props,this.state);

		let retailer_list = props.retailer_list.filter(e => (
			e.has_loyalty_card &&
			(props.user.loyalty_card.map(g => g.retailer_id).indexOf(e.id)<0)
		));

		let button_styles		= [styles.main_button,this.state.ready ? styles.active_button : styles.passive_button];
		let button_text_styles	= [styles.main_button_text,this.state.ready ? styles.active_button_text : styles.passive_button_text];

		return (
			<View style={styles.main}>
				<Text style={styles.main_text}>Выберите торговую сеть из списка</Text>
				<View style={styles.main_input}>
					<SelectRetailer
						value={state.retailer_id}
						data={retailer_list}
						update={retailer_id => this.update({retailer_id})}
						error={this.retailer_error}
					/>
					<InputCard
						title="Номер карты лояльности"
						value={state.number}
						update={number => this.update({number})}
						error={state.number_error}
					/>
				</View>
				<TouchableOpacity style={button_styles} onPress={this.send}>
					<Text style={button_text_styles}>Добавить</Text>
				</TouchableOpacity>
			</View>
		);
	}
});
