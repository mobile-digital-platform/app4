import React from 'react';
import {Dimensions,Platform,Image,View,} from 'react-native';

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
		width: 220*scale,
		marginHorizontal: 0,
		paddingVertical: 5,
		fontSize: 16*scale, fontFamily: 'GothamPro-Bold',
		...Platform.select({ios:{},android:{fontWeight:'200'}}),
	},
};

const dark = {
	headerStyle: {
		height: 50*scale,
		borderBottomWidth: 0,
		backgroundColor: '#fff',
	},
	headerTintColor: '#3d3d3d',
	headerBackTitle: ' ',
	headerTitleStyle: {
		width: '100%',
		paddingVertical: 3,
		fontSize: 16*scale, fontFamily: 'GothamPro-Bold',
		...Platform.select({ios:{},android:{fontWeight:'200'}}),
	},
};

export {light,dark};
