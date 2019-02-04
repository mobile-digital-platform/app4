import React,{Component} from 'react';
import {withNavigation} from 'react-navigation';

import Layout from './layout';

export default withNavigation(class PromoMyPrizesComponent extends Component {
	state = {};

	componentDidMount() {
		this.id = this.props.navigation.getParam('id',0);
	}

	render() {
		return (
			<Layout
				{...this.props}
			/>
		);
	}
});
