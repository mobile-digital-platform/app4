import {connect} from 'react-redux';

import {module as promo_module}		from '../../../redux/reducers/promo';
import {module as settings_module}	from '../../../redux/reducers/settings';
import {
	open_smoke,
	close_smoke,
	module as smoke_module
} from '../../../redux/reducers/smoke';

import Component from './component';

const mapStateToProps = state => ({
	user: state[settings_module],
	promo: state[promo_module],
	smoke:	state[smoke_module],
});

const mapDispatchToProps = {
	open_smoke,
	close_smoke,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
