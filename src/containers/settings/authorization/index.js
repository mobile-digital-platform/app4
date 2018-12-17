// Авторизация

import {connect} from 'react-redux';

import {
	authorize,
	module as settings_module
} from '../../../redux/reducers/settings';
import Component from './component';

const mapStateToProps = state => ({
	user:			state[settings_module].user,
	error:			state[settings_module].error,
	initialized:	state[settings_module].initialized,
	loading:		state[settings_module].loading,
});

const mapDispatchToProps = {
	authorize,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
