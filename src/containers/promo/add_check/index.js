import {connect} from 'react-redux';

import {change_camera,change_qr,module as promo_module} from '../../../redux/reducers/promo/add_check';
import Component from './component';

const mapStateToProps = state => ({
	scan_list: state[promo_module].scan_photos,
	camera_visible: state[promo_module].camera_visible,
	qr_visible: state[promo_module].qr_visible,
});

const mapDispatchToProps = {
	change_camera,
	change_qr,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
