import React,{Component}	from 'react';
import {StatusBar,StyleSheet,View}	from 'react-native';

import {light,dark}			from '../../navigation';

import Settings_Button		from '../../containers/settings_button';
import Tabs					from '../../containers/main_tabs';

import Promo_Participate	from '../../containers/promo/participate';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

let theme = JSON.parse(JSON.stringify(light));
theme.headerTitleStyle.fontSize = 17;

export default class PromoView extends Component {
	static navigationOptions = ({navigation}) => ({
		title: 'Принять участие'.toUpperCase(),
		headerRight: (<Settings_Button navigation={navigation} style={{color:'#fff'}} />),
		...theme,
	});

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Promo_Participate/>
			</View>
		);
	}
}
