import {connect} from 'react-redux';

import {get_data,module as promo_module} from '../../redux/reducers/promo/list';
import {
	update_user,
	module as settings_module
} from '../../redux/reducers/settings';
import Component from './component';

const mapStateToProps = state => ({
	user: state[settings_module],
	promo_list: state[promo_module],
});

const mapDispatchToProps = {
	update_user,
	get_data,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
