import React,{Component} from 'react';
import {Dimensions,StyleSheet,Image,StatusBar,TouchableOpacity,Text,View} from 'react-native';
import Swiper from 'react-native-swiper';

import st from '../services/storage';

import Image1	from '../../assets/onboarding_screen/1.png';
import Image2	from '../../assets/onboarding_screen/2.png';
import Image3	from '../../assets/onboarding_screen/3.png';
import Image4	from '../../assets/onboarding_screen/4.png';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f40000',
	},
	area: {
		// backgroundColor: '#d20',
	},
	window: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingVertical: 60, paddingHorizontal: 20,
	},
	image: {
		// height: Dimensions.get('window').width*0.6,
		// width:  Dimensions.get('window').width*0.6,
		marginTop: 40,
		resizeMode: 'contain',
	},
	text: {
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
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
		fontSize: 20,
		textAlign: 'center',
	},
	dark_button_text: {
		color: '#fff',
		fontWeight: 'bold',
	},
	light_button_text: {
		color: '#f40000',
	},
});

const slide = [
	(
		<View key={0} style={styles.window}>
			<Image style={styles.image} source={Image1} />
			<Text style={styles.text}>Все акции Кока-Колы{'\n'}в одном приложении!{'\n'}Узнавай и участвуй!</Text>
		</View>
	),
	(
		<View key={1} style={styles.window}>
			<Image style={styles.image} source={Image2} />
			<Text style={styles.text}>Регистрируйся{'\n'}и выигрывай призы!</Text>
		</View>
	),
	(
		<View key={2} style={styles.window}>
			<Image style={styles.image} source={Image3} />
			<Text style={styles.text}>Легко сканируй QR-коды{'\n'}и загружай чеки с помощью{'\n'}встроенного функционала</Text>
		</View>
	),
	(
		<View key={3} style={styles.window}>
			<Image style={styles.image} source={Image4} />
			<Text style={styles.text}>Получай уведомления{'\n'}и будь в курсе самого{'\n'}интересного!</Text>
		</View>
	),
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
					activeDotColor='#fff'
					style={styles.area}
					onMomentumScrollEnd={(e,state) => this.setState({index:+state?.index})}
				>
					{slide}
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
