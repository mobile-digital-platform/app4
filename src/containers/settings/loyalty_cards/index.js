// Добавление карты лояльности

import {connect} from 'react-redux';

import {
	add_loyalty_card,
	module as settings_module
} from '../../../redux/reducers/settings';
import {
	open_smoke,
	close_smoke,
	module as smoke_module
} from '../../../redux/reducers/smoke';

import Component from './component';

const mapStateToProps = state => ({
	user: state[settings_module],
});

const mapDispatchToProps = {
	add_loyalty_card,
	open_smoke,
	close_smoke,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
