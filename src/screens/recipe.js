import React			from 'react';
import {StatusBar,View}	from 'react-native';
import EStyleSheet		from 'react-native-extended-stylesheet';
import firebase			from 'react-native-firebase';
import {withNavigation}	from 'react-navigation';

import {light,dark}		from '../navigation';

import DrawerButton		from '../containers/drawer_button';
import SettingsButton	from '../containers/settings_button';

import PromoDetails		from '../containers/recipe';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

const page_title = 'Рецепты';

export default withNavigation(class PromoDetailsScreen extends React.Component {
	static navigationOptions = ({navigation}) => ({
		title: page_title.toUpperCase(),
		...light,
		headerLeft: (<DrawerButton navigation={navigation} type='light' />),
		headerRight: (<SettingsButton navigation={navigation} type='light' />),
	});

	componentDidMount() {
		this.props.navigation.addListener('didFocus',_=>{
			firebase.analytics().setCurrentScreen(page_title);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<PromoDetails/>
			</View>
		);
	}
});
