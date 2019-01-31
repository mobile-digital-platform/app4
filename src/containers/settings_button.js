import React from 'react';
import {Image,TouchableOpacity,Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import SettingsDark  from '../../assets/ui/settings_dark.png';
import SettingsLight from '../../assets/ui/settings_light.png';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'center',
		height: '100%',
		padding: 15,
		// backgroundColor: '#eee',
	},
	icon: {
		height: 20, width: 20,
	},
});

export default ({navigation,type = 'dark'}) => (
	<TouchableOpacity style={styles.container} onPress={_=>navigation.navigate('settings')}>
		<Image style={styles.icon} source={{dark:SettingsDark,light:SettingsLight}[type]} />
	</TouchableOpacity>
);
