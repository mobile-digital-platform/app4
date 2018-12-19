import {connect} from 'react-redux';

import {get_data,module as promo_module}		from '../../../redux/reducers/promo/participate';
import {update_user,module as settings_module}	from '../../../redux/reducers/settings';
import Component from './component';

const mapStateToProps = state => ({
	participation: state[promo_module],
	user: state[settings_module],
});

const mapDispatchToProps = {
	get_data,
	update_user,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
