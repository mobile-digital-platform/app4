import {connect} from 'react-redux';

import {get_prizes,send_choice,module as promo_module} from '../../../redux/reducers/promo/choose_prize';
import Component from './component';

const mapStateToProps = state => ({
	...state[promo_module]
});

const mapDispatchToProps = {
	get_prizes,
	send_choice,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
