import React,{Component} from 'react';
import {Platform,StatusBar,Image,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {light,dark}		from '../../navigation';

import Settings_Button	from '../../containers/settings_button';
import Tabs				from '../../containers/main_tabs';

import PromoMyList		from '../../containers/promo/my_list';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.select({ios:10,android:20}),
		backgroundColor: '#fff',
	},
});

export default class MainList extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Акции'.toUpperCase(),
		headerRight: (<Settings_Button navigation={navigation} />),
		...dark,
	});

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<PromoMyList/>
			</View>
		);
	}
}
