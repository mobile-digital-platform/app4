// Список акций на главном экране

import {connect} from 'react-redux';

import {
	set_promo_list,
	set_my_promo_list,
	module as promo_module
} from '../../../redux/reducers/promo';
import {
	module as settings_module
} from '../../../redux/reducers/settings';
import Component from './component';

const mapStateToProps = state => ({
	user:			state[settings_module],
	list:			state[promo_module].promo_list,
	my_list:		state[promo_module].my_promo_list,
	retailer_list:	state[promo_module].retailer_list,
});

const mapDispatchToProps = {
	set_promo_list,
	set_my_promo_list,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
