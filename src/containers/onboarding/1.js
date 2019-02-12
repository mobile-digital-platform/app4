import React,{Component} from 'react';
import {Animated,Easing,Image,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Image1	from '../../../assets/onboarding_screen/1/icon1.png';
import Image2	from '../../../assets/onboarding_screen/1/icon2.png';
import Image3	from '../../../assets/onboarding_screen/1/icon3.png';
import Image4	from '../../../assets/onboarding_screen/1/icon4.png';
import Image5	from '../../../assets/onboarding_screen/1/icon5.png';
import Image6	from '../../../assets/onboarding_screen/1/icon6.png';
import Image7	from '../../../assets/onboarding_screen/1/icon7.png';
import Image8	from '../../../assets/onboarding_screen/1/icon8.png';
import Image9	from '../../../assets/onboarding_screen/1/icon9.png';

const styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		height: 210, width: 210,
		margin: -5,
		// backgroundColor: '#d20',
	},
	block: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 70, width: 70,
	},
	image_start: {
		height: 70, width: 67,
	},
	image: {
		height: 60, width: 60,
	},
	image9_start: {
		height: 7, width: 25,
	},
	image9: {
		height: 6, width: 22,
	},
});

const wait = 200;		// Ожидание в начале
const interval = 50;	// Отступ до начала появления каждой картинки
const duration = 400;	// Время появления картинки

export default class Onboarding1 extends Component {
	state = {
		source_list: [
			Image1,
			Image2,
			Image3,
			Image4,
			Image5,
			Image6,
			Image7,
			Image8,
			Image9,
		],
		icon: Array.from({length:9}).fill('initial'),
	};

	componentDidMount() {
		// Проигрываем сразу, потому что это первый экран
		setTimeout(_ => {
			// Начинаем каждую с небольшим отступом по времени
			for(let i=0; i<9; i++) setTimeout(_=>this.start(i),interval*i);
		},wait);
	}

	start = (i) => {
		this.setState(({icon}) => {
			icon[i] = 'show';
			return {icon};
		});
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.icon.map((e,i) => (<Icon key={i} i={i} state={e} source={this.state.source_list[i]} />))}
			</View>
		);
	}
}

class Icon extends Component {
	state = {
		value: new Animated.Value(0),
		opacity: 1,
		height: styles.image_start.height,
		width:  styles.image_start.width,
	}

	componentDidMount() {
		this.setState({
			opacity: this.state.value.interpolate({
				inputRange: [0,1],
				outputRange: [0,1],
			}),
		});

		// Все картинки как картинки, а последняя - других размеров
		if(this.props.i < 8) {
			this.setState({
				height: this.state.value.interpolate({
					inputRange: [0,1],
					outputRange: [styles.image_start.height,styles.image.height],
				}),
				width: this.state.value.interpolate({
					inputRange: [0,1],
					outputRange: [styles.image_start.width,styles.image.width],
				}),
			});
		} else {
			this.setState({
				height: this.state.value.interpolate({
					inputRange: [0,1],
					outputRange: [styles.image9_start.height,styles.image9.height],
				}),
				width: this.state.value.interpolate({
					inputRange: [0,1],
					outputRange: [styles.image9_start.width,styles.image9.width],
				}),
			});
		}
	}
	componentDidUpdate(prev_props) {
		if(prev_props.state == 'initial' && this.props.state == 'show') {
			this.animation = Animated.timing(this.state.value,{
				toValue: 1,
				duration: duration,
				easing: Easing.linear,
			});
			this.animation?.start();
		}
	}
	componentWillUnmount() {
		this.animation.stop();
	}

	render() {
		return (
			<Animated.View style={[styles.block,{opacity:this.state.opacity}]}>
				<Animated.Image
					style={{height:this.state.height,width:this.state.width}}
					source={this.props.source}
				/>
			</Animated.View>
		);
	}
}
