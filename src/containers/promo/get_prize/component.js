import React from 'react';
import {withNavigation} from 'react-navigation';

import LayoutMail	from './mail';
import LayoutCenter	from './center';

export default withNavigation((props) => {
	let promo_id		= props.navigation.getParam('promo_id',0),
		get_type		= props.navigation.getParam('get_type',1);

	if(get_type == 1) {
		return (<LayoutCenter	{...props} {...{promo_id,get_type}} />);
	} else if(get_type == 2) {
		return (<LayoutMail		{...props} {...{promo_id,get_type}} />);
	} else {
		return null;
	}
});
