import React			from 'react';
import {StatusBar,View}	from 'react-native';
import EStyleSheet		from 'react-native-extended-stylesheet';
import firebase			from 'react-native-firebase';

import st				from '../services/storage';

import Onboarding		from '../containers/onboarding';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '$red',
	},
});

const page_title = 'Посадочная';

export default class OnboardingScreen extends React.Component {

	componentDidMount() {
		firebase.analytics().setCurrentScreen(page_title);
		// firebase.analytics().logEvent("",{});
	}

	next = async () => {
		await st.set('installed',true);
		this.props.set_page('splash');
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Onboarding next={this.next} />
			</View>
		);
	}
}
