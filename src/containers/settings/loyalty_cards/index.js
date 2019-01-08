// Добавление карты лояльности

import {connect} from 'react-redux';

import {module as promo_module} from '../../../redux/reducers/promo';
import {
	update_user,
	add_loyalty_card,
	module as settings_module
} from '../../../redux/reducers/settings';
import {
	open_smoke,
	close_smoke,
	module as smoke_module
} from '../../../redux/reducers/smoke';

import Component from './component';

const mapStateToProps = state => ({
	retailer_list: state[promo_module].retailer_list,
	user: state[settings_module],
});

const mapDispatchToProps = {
	update_user,
	add_loyalty_card,
	open_smoke,
	close_smoke,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
