import React from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

import Check		from './check';
import Separator	from './separator';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	banner: {
		padding: 20, paddingTop: 50,
	},
	title: {
		marginBottom: 10,
		color: '#fff',
		fontSize: 24, fontWeight: 'bold',
		textTransform: 'uppercase',
		textShadowRadius: 5, textShadowColor: '#111',
	},
	subtitle: {
		paddingBottom: 10,
		color: '#bbb',
		fontSize: 16, fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	ending: {
		color: '#fff',
		fontSize: 18,
		textShadowRadius: 5, textShadowColor: '#111',
	},

	list: {
		paddingHorizontal: 20,
	},

	bottom: {
		alignItems: 'center',
		padding: 15,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},
	get_button: {
		paddingVertical: 15, paddingHorizontal: 50,
		borderRadius: 100,
		backgroundColor: 'red',
	},
	get_button_text: {
		color: '#fff',
		fontSize: 16, fontWeight: 'bold',
	},
});

export default withNavigation(({navigation,data}) => (
	<View style={styles.container}>
		<ScrollView>
			<ImageBackground style={styles.banner} source={{uri:'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg'}}>
				<Text style={styles.title}>{data.title}</Text>
				<Text style={styles.ending}>Заканчивается через {data.ending} дней</Text>
			</ImageBackground>
			<FlatList
				style={styles.list}
				data={data.check}
				renderItem={({item}) => (<Check data={item} />)}
				// ItemSeparatorComponent={Separator}
				keyExtractor={item => ''+item.id}
			/>
		</ScrollView>
		<View style={styles.bottom}>
			<View style={styles.get_button}><Text style={styles.get_button_text}>Получить выигрыш</Text></View>
		</View>
	</View>
));
