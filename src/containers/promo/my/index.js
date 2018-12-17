import {connect} from 'react-redux';

import {get_data,module as promo_module} from '../../../redux/reducers/promo/my';
import Component from './component';

const mapStateToProps = state => ({
	loading:		state[promo_module].loading,
	loaded:			state[promo_module].loaded,
	error:			state[promo_module].error,
	initialized:	state[promo_module].initialized,
	data:			state[promo_module].data,
});

const mapDispatchToProps = {
	get_data,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
