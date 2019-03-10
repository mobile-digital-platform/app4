import React			from 'react';
import {StatusBar,View}	from 'react-native';
import EStyleSheet		from 'react-native-extended-stylesheet';
import firebase			from 'react-native-firebase';
import {withNavigation}	from 'react-navigation';

import {light,dark}		from '../../navigation';

import SettingsButton	from '../../containers/settings_button';

import PromoPassport	from '../../containers/promo/passport';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

const page_title = 'Паспортные данные';

export default withNavigation(class PromoView extends React.Component {
	static navigationOptions = ({navigation}) => ({
		title: page_title.toUpperCase(),
		headerRight: (<SettingsButton navigation={navigation} type='light' />),
		...light,
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
				<PromoPassport/>
			</View>
		);
	}
});
