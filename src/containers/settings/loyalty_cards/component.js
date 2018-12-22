import React,{Component} from 'react';
import {StyleSheet,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import InputCard		from '../../../templates/input_card';
import SelectNetwork	from '../../../templates/select_network';

import alert			from '../../../services/alert';
import st				from '../../../services/storage';

import {request}		from '../../../redux/reducers/settings';

const styles = StyleSheet.create({
	main: {
		padding: 20,
	},
	main_text: {
		fontSize: 16,
		textAlign: 'center',
	},
	main_input: {
		paddingVertical: 15,
	},
	main_button: {
		marginBottom: 10, padding: 15,
		borderRadius: 40,
	},
	main_button_text: {
		fontSize: 20, fontWeight: 'bold',
		textAlign: 'center',
	},

	active_button: {
		backgroundColor: '#f40000',
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

let data = [
	{
		id: 1,
		name: 'Магнит',
	},
	{
		id: 2,
		name: 'Пятерочка',
	},
	{
		id: 3,
		name: 'Лента',
	},
];

export default withNavigation(class LoyaltyCardsComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			network_id: 1,
			network_name: 'Магнит',
			network_error: '',
			opened: false,
			number: '',
			number_error: '',
			ready: false,
		};
	}

	componentDidMount() {
		console.log(this.props);
	}

	open = () => this.setState({opened:true});
	choose = (network_id) => this.setState({network_id,opened:false});
	update = async (state_adjust) => {
		await this.setState(state_adjust);

		// Убираем показ ошибок, если они исправлены
		if(this.state.number.length && this.state.number_error) this.setState({number_error:''});

		if(this.state.network_id && this.state.number.length) this.setState({ready:true});
	}
	send = async () => {
		if(!this.state.network_id) {
			this.setState({network_error:'Выберите торговую сеть'});
			return;
		}
		if(!this.state.number.length) {
			this.setState({number_error:'Введите номер карты лояльности'});
			return;
		}

		let obj = {
			user_id:	this.props.user.id,
			network_id:	this.state.network_id,
			number:		this.state.number,
		};

		this.props.open_smoke();
		let {response,error} = await request.add_loyalty_card(obj);
		if(response) {
			this.props.update_user({loyalty_card:[...this.props.user.loyalty_card,obj]});
		}
		if(error) {
			await alert("Ошибка","Не удалось добавить карту");
		}
		this.props.close_smoke();
	}

	render() {
		let state = this.state;
		console.log("LoyaltyCardsComponent",this.props,this.state);

		let button_styles		= [styles.main_button,this.state.ready ? styles.active_button : styles.passive_button];
		let button_text_styles	= [styles.main_button_text,this.state.ready ? styles.active_button_text : styles.passive_button_text];

		return (
			<View style={styles.main}>
				<Text style={styles.main_text}>Выберите торговую сеть из списка</Text>
				<View style={styles.main_input}>
					<SelectNetwork
						value={state.network_id}
						data={data}
						update={network_id => this.update({network_id})}
						error={this.network_error}
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
