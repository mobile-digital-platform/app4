import {connect} from 'react-redux';

import {
	update_user,
	log_out,
	module as settings_module
} from '../../redux/reducers/settings';
import Component from './component';

const mapStateToProps = state => ({
	user: state[settings_module],
});

const mapDispatchToProps = {
	update_user,
	log_out,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
