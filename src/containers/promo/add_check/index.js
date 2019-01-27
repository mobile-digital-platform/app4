import {connect} from 'react-redux';

import {update_check,module as promo_module} from '../../../redux/reducers/promo/add_check';
import Component from './component';

const mapStateToProps = state => ({
	...state[promo_module]
});

const mapDispatchToProps = {
	update_check,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);