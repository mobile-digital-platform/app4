import React from 'react';
import Root from './src/root';

import './polyfills';

export default (props) => {
	console.log(props);
	return <Root/>;
}
