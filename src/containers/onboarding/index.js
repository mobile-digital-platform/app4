import React,{Component} from 'react';
import {Platform,Image,TouchableOpacity,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';

import Component1 from './1';
import Component2 from './2';
import Component3 from './3';
import Component4 from './4';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
	},
	area: {
		// backgroundColor: '#d20',
	},
	window: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 60, paddingHorizontal: 20,
	},
	component: {
		height: 200,
		marginTop: 30,
	},
	text_area: {
		flex: 1,
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
		lineHeight: 19,
	},
	button_area: {
		padding: 60, paddingTop: 0,
	},
	button: {
		paddingVertical: 15, paddingHorizontal: 50,
		borderWidth: 2, borderColor: '#fff',
		borderRadius: 100,
	},
	dark_button: {
	},
	light_button: {
		backgroundColor: '#fff',
	},
	button_text: {
		paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 16,
		textAlign: 'center',
		lineHeight: 16,
	},
	dark_button_text: {
		color: '#fff',
		fontWeight: 'bold',
	},
	light_button_text: {
		color: '$red',
	},
});

export default class OnboardingComponent extends Component {
	state = {
		index: 0,
	};

	render() {
		const slide = [
			{
				component: <Component1 focus={this.state.index==0} />,
				text: 'Все акции Кока-Колы\nв одном приложении!\nУзнавай и участвуй!',
			},
			{
				component: <Component2 focus={this.state.index==1} />,
				text: 'Регистрируйся\nи выигрывай призы!',
			},
			{
				component: <Component3 focus={this.state.index==2} />,
				text: 'Легко сканируй QR-коды\nи загружай чеки с помощью\nвстроенного функционала',
			},
			{
				component: <Component4 focus={this.state.index==3} />,
				text: 'Получай уведомления\nи будь в курсе самого\nинтересного!',
			},
		];

		return (
			<View style={styles.container}>
				<Swiper
					ref={ref => this.swipe=ref}
					loop={false}
					autoplay={false}
					autoplayTimeout={5}
					showsPagination={false}
					style={styles.area}
					onMomentumScrollEnd={(e,state) => this.setState({index:+state?.index})}
				>
					{slide.map((e,i) => (
						<View key={i} style={styles.window}>
							<View style={styles.component}>{e.component}</View>
							<View style={styles.text_area}>
								<Text style={styles.text}>{e.text}</Text>
							</View>
						</View>
					))}
				</Swiper>
				<View style={styles.button_area}>
				{this.state.index<3 ? (
					<TouchableOpacity style={[styles.button,styles.dark_button]} onPress={_=>this.swipe.scrollBy(1)}>
						<Text style={[styles.button_text,styles.dark_button_text]}>Дальше</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={[styles.button,styles.light_button]} onPress={this.props.next}>
						<Text style={[styles.button_text,styles.light_button_text]}>Начать</Text>
					</TouchableOpacity>
				)}
				</View>
				{/*
				<Image style={[styles.image]} source={{uri:'https://www.coca-cola.ru/images/meals/logo.png'}} />
				<TouchableOpacity style={styles.button} onPress={_=>this.props.navigation.replace('splash')}>
					<Text style={styles.button_text}>Начать</Text>
				</TouchableOpacity>
				*/}
			</View>
		);
	}
}
