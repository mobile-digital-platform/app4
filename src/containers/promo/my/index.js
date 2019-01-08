// Список моих акций на главном экране

import {connect} from 'react-redux';

import {module as promo_module}		from '../../../redux/reducers/promo';
import {module as settings_module}	from '../../../redux/reducers/settings';
import Component from './component';

const mapStateToProps = state => ({
	data: state[promo_module].promo_list,
	user: state[settings_module],
});

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
