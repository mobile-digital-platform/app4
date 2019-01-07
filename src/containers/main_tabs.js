import React from 'react';
import {StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	tab_bar: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'baseline',
		height: 45, width: 282,
		marginBottom: 10,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
	},
	tab: {
		justifyContent: 'center',
		height: 45,
		margin: -1, paddingVertical: 10, paddingHorizontal: 30,
	},
	tab_selected: {
		borderRadius: 100,
		backgroundColor: 'red',
	},
	text: {
		paddingTop: 3,
		fontSize: 16, fontFamily: 'GothamPro',
	},
	text_selected: {
		color: '#fff',
	},
});

export default withNavigation(({my,send}) => {
	let selected = !my;
	return (
		<View style={styles.container}>
			<View style={styles.tab_bar}>
				<TouchableOpacity style={[styles.tab,selected ? [styles.tab_selected,{marginRight:-10}] : {}]} onPress={_=>send(false)}>
					<Text style={[styles.text,selected ? styles.text_selected : {}]}>Все акции</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.tab,selected ? {} : [styles.tab_selected,{marginLeft:-10}]]} onPress={_=>send(true)}>
					<Text style={[styles.text,selected ? {} : styles.text_selected]}>Мои акции</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
});
