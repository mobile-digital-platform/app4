import React from 'react';
import {Platform,Image,TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import ArrowBackLight from '../../assets/ui/back_arrow_white.png';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'center',
		height: '100%',
		paddingTop:    Platform.select({ios:14,android:16}),
		paddingBottom: Platform.select({ios:16,android:14}),
		paddingHorizontal: 15,
		// backgroundColor: '#ddd',
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
