// Авторизация

import {connect} from 'react-redux';

import {
	set_promo_list,
	set_my_promo_list,
	module as promo_module
} from '../../../redux/reducers/promo';
import {
	update_user,
	log_out,
	module as settings_module
} from '../../../redux/reducers/settings';
import {
	open_smoke,
	close_smoke,
	module as smoke_module
} from '../../../redux/reducers/smoke';

import Component from './component';

const mapStateToProps = state => ({
	user:	state[settings_module].user,
	promo:	state[promo_module],
	smoke:	state[smoke_module],
});

const mapDispatchToProps = {
	set_promo_list,
	set_my_promo_list,
	update_user,
	log_out,
	open_smoke,
	close_smoke,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
