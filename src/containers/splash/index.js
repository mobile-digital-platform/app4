import {connect} from 'react-redux';

import {
	set_promo_list,
	set_my_promo_list,
	set_retailer_list,
	module as promo_module
} from '../../redux/reducers/promo';
import {
	update_user,
	module as settings_module
} from '../../redux/reducers/settings';
import Component from './component';

const mapStateToProps = state => ({
	user: state[settings_module],
	promo: state[promo_module],
});

const mapDispatchToProps = {
	set_promo_list,
	set_my_promo_list,
	set_retailer_list,
	update_user,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
