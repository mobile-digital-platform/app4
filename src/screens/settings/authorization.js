import React			from 'react';
import {StatusBar,View} from 'react-native';
import EStyleSheet		from 'react-native-extended-stylesheet';
import firebase			from 'react-native-firebase';
import {withNavigation}	from 'react-navigation';

import {light,dark}		from '../../navigation';

import Authorization	from '../../containers/settings/authorization';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

const page_title = 'Авторизация';

export default withNavigation(class MainList extends React.Component {
	static navigationOptions = ({navigation}) => ({
		title: page_title.toUpperCase(),
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
				<Authorization/>
			</View>
		);
	}
});
