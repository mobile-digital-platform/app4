// Список акций на главном экране

import {connect} from 'react-redux';

import {module as promo_module} from '../../../redux/reducers/promo';
import Component from './component';

const mapStateToProps = state => ({
	list:		state[promo_module].promo_list,
	my_list:	state[promo_module].my_promo_list,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
