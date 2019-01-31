import React,{Component} from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import {withNavigation} from 'react-navigation';

import Tabs			from '../../main_tabs';

import AllLayout	from './all_layout/list';
import MyLayout		from './my_layout/list';

export default withNavigation(class PromoListComponent extends Component {
	constructor(props) {
		super(props);

		this.swipe;
		this.state = {
			loading: false,
			page: 0,
			focus: -1,
		};
	}

	componentDidMount() {
		// this.props.navigation.push('settings');
	}
	componentDidUpdate(prev_props) {
		// Страница по умолчанию, сюда можно перейти из принятия участия в акции
		let prev_page = prev_props.navigation.getParam('page',0);
		let this_page = this.props.navigation.getParam('page',0);
		if(prev_page != this_page) this.change_page(this_page);

		if(prev_props.focus != this.props.focus && this.state.focus != this.props.focus && this.props.focus>=0) {
			this.setState({focus:this.props.focus});
		}
	}

	change_page = (page) => {
		console.log(page,this.state.page);
		let diff = page-this.state.page;
		this.setState({page});
		if(diff != 0) this.swipe.scrollBy(diff);
	}
	reload = () => {
		this.setState({loading:true});
		setTimeout(_=>this.setState({loading:false}),1000);
	}

	render() {
		let {props,state} = this;

		let list = [
			(<AllLayout key={0} {...props} loading={state.loading} reload={this.reload} />),
			(<MyLayout  key={1} {...props} loading={state.loading} reload={this.reload} focus={state.focus} />),
		];

		return (
			<>
				<Tabs page={state.page} change_page={this.change_page} />
				<Swiper
					ref={ref => this.swipe=ref}
					loop={false}
					autoplay={false}
					showsPagination={false}
					onMomentumScrollEnd={(e,state) => this.setState({page:state?.index})}
				>
					{list}
				</Swiper>
			</>
		);
	}
});
