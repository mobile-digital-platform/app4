import React from 'react';
import {Dimensions,Image,View,} from 'react-native';

import config from '../config';

import BackButton from '../containers/back_button';

const scale = Dimensions.get('window').width/config.base_width;

const light = {
	headerStyle: {
		height: 50*scale,
		borderBottomWidth: 0,
		backgroundColor: '#f40000',
	},
	headerTintColor: '#fff',
	headerLeft: (<BackButton/>),
	headerTitleStyle: {
		width: 200*scale,
		paddingVertical: 3,
		fontSize: 16*scale, fontFamily: 'GothamPro', fontWeight: 'bold',
	},
};

const dark = {
	headerStyle: {
		height: 50*scale,
		borderBottomWidth: 0,
		backgroundColor: '#fff',
	},
	headerTintColor: '#000',
	headerBackTitle: ' ',
	headerLeftContainerStyle: {
		padding: 10,
		color: '#000',
	},
	headerTitleStyle: {
		width: 200*scale,
		paddingVertical: 3,
		fontSize: 16*scale, fontFamily: 'GothamPro', fontWeight: 'bold',
	},
};

export {light,dark};
