import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import {request} from '../../../redux/reducers/promo';

import alert from '../../../services/alert';

import Layout from './layout';

export default withNavigation(class PromoChoosePrizeComponent extends Component {
	state = {
		available_points: 0,
		available_points_type: '',
		list: [],
		loading: false,
	};

	async componentDidMount() {
		this.id = this.props.navigation.getParam('id',0);
		this.load_data();
	}
	componentDidUpdate(prev_props) {
		if(!Object.is(this.props.user,prev_props.user) && this.props.user.id) {
			this.setState({available_points:0,available_points_type:'',list:[]});
			this.load_data();
		}
	}

	load_data = async () => {
		this.setState({loading:true});
		// Если загружаем в первый раз, то не показываем значок загрузки, если она длится менее секунды
		// if(!this.state.list.length) setTimeout(_=>this.setState(state => ({loading:!state.list.length})),1000);

		// Загрузка своих баллов и списка доступных подарков
		let {response,error} = await request.choose_prize({user_id:this.props.user.id,promo_id:this.id});
		if(response) {
			this.setState({
				available_points:		response.available_points,
				available_points_type:	response.available_points_type,
				list:					response.items,
			});
		}
		if(error) {
			await alert("Не удалось загрузить данные",error.message);
		}
		this.setState({loading:false});
	}

	// Покупка подарка за баллы
	buy_prize = async (prize) => {
		this.props.open_smoke();
		let {response,error} = await request.buy_prize({user_id:this.props.user.id,promo_id:this.id,prize_id:prize.id});
		if(response) {
			// await alert("Поздравляем, вы успешно выбрали приз");
			this.setState(state => ({available_points:state.available_points-prize.cost}));
			this.props.navigation.push('promo_my_prizes',{id:this.id});
		}
		if(error) {
			await alert("Не удалось загрузить данные",error.message);
		}
		this.props.close_smoke();
	}

	render() {
		console.log(this.state);
		return (
			<Layout
				promo_id={this.id}
				{...this.props}
				{...this.state}
				reload={this.load_data}
				buy_prize={this.buy_prize}
			/>
		);
	}
});
