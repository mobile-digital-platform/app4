import React,{Component} from 'react';
import {Dimensions,Platform,Image,StatusBar,TouchableOpacity,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';

import st from '../services/storage';

import Image1	from '../../assets/onboarding_screen/1.png';
import Image2	from '../../assets/onboarding_screen/2.png';
import Image3	from '../../assets/onboarding_screen/3.png';
import Image4	from '../../assets/onboarding_screen/4.png';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '$red',
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
	image: {
		height: 200,
		width: 200,
		marginTop: 30,
		resizeMode: 'contain',
	},
	text_area: {
		flex: 1,
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro-Medium',
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

const slide = [
	{
		image: Image1,
		text: 'Все акции Кока-Колы\nв одном приложении!\nУзнавай и участвуй!',
	},
	{
		image: Image2,
		text: 'Регистрируйся\nи выигрывай призы!',
	},
	{
		image: Image3,
		text: 'Легко сканируй QR-коды\nи загружай чеки с помощью\nвстроенного функционала',
	},
	{
		image: Image4,
		text: 'Получай уведомления\nи будь в курсе самого\nинтересного!',
	},
];

export default class Onboarding extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 0,
		}
	}

	next = async () => {
		await st.set('installed',true);
		this.props.set_page('splash');
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Swiper
					ref={ref => this.swipe=ref}
					loop={false}
					autoplay={true}
					autoplayTimeout={3}
					showsPagination={false}
					style={styles.area}
					onMomentumScrollEnd={(e,state) => this.setState({index:+state?.index})}
				>
					{slide.map((e,i) => (
						<View key={i} style={styles.window}>
							<Image style={styles.image} source={e.image} />
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
					<TouchableOpacity style={[styles.button,styles.light_button]} onPress={this.next}>
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
