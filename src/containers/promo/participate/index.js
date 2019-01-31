import {connect} from 'react-redux';

import {
	set_promo_list,
	set_my_promo_list,
	add_my_promo,
	module as promo_module
} from '../../../redux/reducers/promo';
import {
	update_user,
	add_loyalty_card,
	remove_loyalty_card,
	module as settings_module
} from '../../../redux/reducers/settings';
import {
	open_smoke,
	close_smoke,
	module as smoke_module
} from '../../../redux/reducers/smoke';
import Component from './component';

const mapStateToProps = state => ({
	user: state[settings_module],
	promo: state[promo_module],
});

const mapDispatchToProps = {
	set_promo_list,
	set_my_promo_list,
	add_my_promo,
	add_loyalty_card,
	remove_loyalty_card,
	update_user,
	open_smoke,
	close_smoke,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
