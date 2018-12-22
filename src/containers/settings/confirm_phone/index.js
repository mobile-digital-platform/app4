import {connect} from 'react-redux';

import {
	update_user,
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
});

const mapDispatchToProps = {
	update_user,
	open_smoke,
	close_smoke,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
