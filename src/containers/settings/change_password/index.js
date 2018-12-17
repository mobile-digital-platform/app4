// Изменение личных данных на странице настроек

import {connect} from 'react-redux';

import {send_data,module as change_password_module} from '../../../redux/reducers/settings/change_password';
import Component from './component';

const mapStateToProps = state => ({
	loading:	state[change_password_module].loading,
	loaded:		state[change_password_module].loaded,
	error:		state[change_password_module].error,
	initialed:	state[change_password_module].initialed,
	data:		state[change_password_module].data,
});

const mapDispatchToProps = {
	send_data,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
