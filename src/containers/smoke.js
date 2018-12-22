import React from 'react';
import {StyleSheet,View} from 'react-native';
import {connect} from 'react-redux';

import {open_smoke,close_smoke,module as smoke_module} from '../redux/reducers/smoke';

import Wait from '../templates/wait';

const mapStateToProps = state => ({...state[smoke_module]});
const mapDispatchToProps = {open_smoke,close_smoke};

const styles = StyleSheet.create({
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
		<Wait style={{color:'#eee'}} />
	</View>
) : null);
