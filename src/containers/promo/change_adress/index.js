import {connect} from 'react-redux';

import {
	update_user,
	module as settings_module
} from '../../../redux/reducers/settings';
import Component from './component';

const mapStateToProps = state => ({
	adress: state[settings_module].adress,
});

const mapDispatchToProps = {
	update_user,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
