import {connect} from 'react-redux';

import {module as promo_module} from '../../../redux/reducers/promo';
import Component from './component';

const mapStateToProps = state => ({
	promo: state[promo_module].promo_list,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
