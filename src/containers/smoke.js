import React from 'react';
import {StyleSheet,ActivityIndicator,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';

import {open_smoke,close_smoke,module as smoke_module} from '../redux/reducers/smoke';

const mapStateToProps = state => ({...state[smoke_module]});
const mapDispatchToProps = {open_smoke,close_smoke};

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		position: 'absolute',
		height: '100%', width: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)',
	}
});

export default connect(mapStateToProps,mapDispatchToProps)(({visible}) => visible ? (
	<View style={styles.container}>
		<ActivityIndicator size='large' />
	</View>
) : null);
