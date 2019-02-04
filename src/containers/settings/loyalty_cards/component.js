import React,{Component} from 'react';
import {Platform,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import f from '../../../functions';

import AnimatedButton	from '../../../templates/animated_button';
import InputCard		from '../../../templates/input_card';
import SelectRetailer	from '../../../templates/select_retailer';

import alert			from '../../../services/alert';
import st				from '../../../services/storage';

import {request}		from '../../../redux/reducers/settings';

const styles = EStyleSheet.create({
	main: {
		padding: 20,
	},
	text: {
		fontSize: 14, fontFamily: 'GothamPro',
		textAlign: 'center',
		lineHeight: 18,
	},
	input_area: {
		paddingVertical: 15,
	},
});

export default withNavigation(class LoyaltyCardsComponent extends Component {
	state = {
		waiting: false,
		ready: false,

		retailer_id: 0,
		retailer_name: '',
		retailer_error: '',
		number: '',
		number_error: '',

		button_state: 'ready',
		result: false,
	};

	update = async (state_adjust) => {
		await this.setState(state_adjust);

		// Убираем показ ошибок, если они исправлены
		if(this.state.number.length && this.state.number_error) this.setState({number_error:''});

		this.setState({ready:!!(this.state.retailer_id && this.state.number.length)});
	}
	send = async () => {
		let state = this.state;

		if(!state.retailer_id) {
			this.setState({retailer_error:'Выберите торговую сеть'});
			return;
		}
		if(!state.number.length) {
			this.setState({number_error:'Введите номер карты лояльности'});
			return;
		}
		if(state.waiting) return;

		let obj = {
			retailer_id:	state.retailer_id,
			number:			f.parse_int(state.number),
		};

		this.setState({waiting:true,button_state:'waiting'});
		// this.props.open_smoke();
		let {response,error} = await request.add_loyalty_card({
			...obj,
			user_id: this.props.user.id
		});
		if(response) {
			this.props.add_loyalty_card(obj);
			this.setState({button_state:'end',result:true});
		}
		if(error) {
			this.setState({button_state:'ready',result:false});
			await alert("Не удалось добавить карту",error.message);
		}
		this.setState({waiting:false});
		// this.props.close_smoke();
	}
	back = () => {
		if(this.state.result) this.props.navigation.goBack();
	}

	render() {
		let {props,state} = this;
		// console.log("LoyaltyCardsComponent",this.props,this.state);

		let retailer_list = props.retailer_list.filter(e => (
			e.has_loyalty_card &&
			(props.user.loyalty_card.map(g => g.retailer_id).indexOf(e.id)<0)
		));

		return (
			<View style={styles.main}>
				<Text style={styles.text}>Выберите торговую сеть из списка</Text>
				<View style={styles.input_area}>
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
				<AnimatedButton
					active={state.ready}
					state={state.button_state}
					on_press={this.send}
					on_end={this.back}
				>
					Добавить
				</AnimatedButton>
			</View>
		);
	}
});
