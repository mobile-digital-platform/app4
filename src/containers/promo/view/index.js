import {connect} from 'react-redux';

import {set_data,get_retailers,module as promo_module} from '../../../redux/reducers/promo/view';
import Component from './component';

const mapStateToProps = state => ({
	loading:		state[promo_module].loading,
	loaded:			state[promo_module].loaded,
	error:			state[promo_module].error,
	initialized:	state[promo_module].initialized,
	data:			state[promo_module].data,
});

const mapDispatchToProps = {
	set_data,
	get_retailers,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
