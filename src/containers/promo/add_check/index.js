import {connect} from 'react-redux';

import {module as promo_module}		from '../../../redux/reducers/promo';
import {module as settings_module}	from '../../../redux/reducers/settings';
import Component from './component';

const mapStateToProps = state => ({
	user: state[settings_module],
	promo: state[promo_module],
});

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
