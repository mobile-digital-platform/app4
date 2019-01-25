import React from 'react';
import {Image,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import ArrowBackLight from '../../assets/ui/back_arrow_white.png';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'center',
		height: '100%',
		padding: 15,
	},
	arrow: {
		height: 20, width: 20,
	},
});

export default withNavigation(({navigation}) => (
	<TouchableOpacity style={styles.container} onPress={_=>navigation.goBack()}>
		<Image style={styles.arrow} source={ArrowBackLight} />
	</TouchableOpacity>
));
