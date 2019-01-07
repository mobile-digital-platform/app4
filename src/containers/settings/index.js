// Главный экран

import {connect} from 'react-redux';

import {module as promo_module} from '../../redux/reducers/promo';
import {
	update_user,
	remove_loyalty_card,
	log_out,
	module as settings_module
} from '../../redux/reducers/settings';
import {
	open_smoke,
	close_smoke,
	module as smoke_module
} from '../../redux/reducers/smoke';

import Component from './component';

const mapStateToProps = state => ({
	retailer_list: state[promo_module].retailer_list,
	user: state[settings_module],
});

const mapDispatchToProps = {
	update_user,
	remove_loyalty_card,
	log_out,
	open_smoke,
	close_smoke,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
