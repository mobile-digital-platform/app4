import {connect} from 'react-redux';

import {module as settings_module} from '../../redux/reducers/settings';
import Component from './component';

const mapStateToProps = state => ({
	user: state[settings_module]
});

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
