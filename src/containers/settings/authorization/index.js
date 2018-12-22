// Авторизация

import {connect} from 'react-redux';

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
	user:			state[settings_module].user,
	error:			state[settings_module].error,
	initialized:	state[settings_module].initialized,
	loading:		state[settings_module].loading,
	smoke:			state[smoke_module],
});

const mapDispatchToProps = {
	update_user,
	log_out,
	open_smoke,
	close_smoke,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
