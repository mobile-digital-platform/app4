import React from 'react';
import {ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
	createAppContainer,
	createDrawerNavigator,
	DrawerItems,
	SafeAreaView
} from 'react-navigation';

import PromoNavigator		from './promo';
import MyPromoNavigator		from './my_promo';
import RecipeNavigator		from './recipe';

import RulesScreen			from '../screens/rules';
import QAScreen				from '../screens/qa';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10,
	},
	text: {
		paddingLeft: 10,
		color: '#fff',
		fontFamily: 'GothamPro',
	},
});

const Drawer = (props) => (
	<ScrollView>
		<SafeAreaView style={styles.container} forceInset={{top:'always',horizontal:'never'}}>
			<DrawerItems
				{...props}
				labelStyle={styles.text}
			/>
		</SafeAreaView>
	</ScrollView>
);

export default createAppContainer(createDrawerNavigator(
	{
		promo: {
			screen: PromoNavigator,
			navigationOptions: {
				title: 'Акции',
			},
		},
		my_promo: {
			screen: MyPromoNavigator,
			navigationOptions: {
				title: 'Мои акции',
			},
		},
		recipe: {
			screen: RecipeNavigator,
			navigationOptions: {
				title: 'Рецепты',
			},
		},
		rules: {
			screen: RulesScreen,
			navigationOptions: {
				title: 'Правила акции',
			},
		},
		qa: {
			screen: QAScreen,
			navigationOptions: {
				title: 'Вопрос-ответ',
			},
		},
	},
	{
		initialRouteName: 'recipe',
		contentComponent: Drawer,
		drawerBackgroundColor: '#f40000',
	}
));
