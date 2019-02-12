import React,{Component} from 'react';
import {Animated,Easing,Image,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Bottle	from '../../../assets/onboarding_screen/4/bottle.png';
import Text1	from '../../../assets/onboarding_screen/4/text1.png';
import Text2	from '../../../assets/onboarding_screen/4/text2.png';

const styles = EStyleSheet.create({
	container: {
		height: 200, width: 200,
		// backgroundColor: '#d20',
	},
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: 14,
	},
	bottle: {
		height: 40, width: 40,
	},
	text1: {
		height: 68, width: 120,
	},
	text2: {
		height: 52, width: 120,
	},
});

const wait = 200;		// Ожидание в начале
const interval = 300;	// Отступ до начала появления каждой картинки
const duration = 500;	// Время появления картинки

export default class Onboarding4 extends Component {
	state = {
		element: Array.from({length:3}).fill('initial'),
		played: false,
	};

	componentDidUpdate(prev_props) {
		// Проигрываем, если до этого еще не играли и фокус переключился
		if(!this.state.played && !prev_props.focus && this.props.focus) {
			this.setState({played:true});
			setTimeout(_ => {
				// Начинаем каждую с небольшим отступом по времени
				for(let i=0; i<9; i++) setTimeout(_=>this.start(i),interval*i);
			},wait);
		}
	}

	start = (i) => {
		this.setState(({element}) => {
			element[i] = 'show';
			return {element};
		});
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.element.map((e,i) => (<Element key={i} i={i} state={e} />))}
			</View>
		);
	}
}

class Element extends Component {
	state = {
		value: new Animated.Value(0),
		opacity: 1,
		left: 0,
		right: 0,
	}

	componentDidMount() {
		this.setState({
			opacity: this.state.value.interpolate({
				inputRange: [0,1],
				outputRange: [0,1],
			}),
			left: this.state.value.interpolate({
				inputRange: [0,1],
				outputRange: [0,10*EStyleSheet.value("$scale")],
			}),
			right: this.state.value.interpolate({
				inputRange: [0,1],
				outputRange: [0,10*EStyleSheet.value("$scale")],
			}),
		});
	}
	componentDidUpdate(prev_props) {
		if(prev_props.state == 'initial' && this.props.state == 'show') {
			Animated.timing(this.state.value,{
				toValue: 1,
				duration: duration,
				easing: Easing.bezier(0.6,0,0.4,1),
			}).start();
		}
	}

	render() {
		return (
			<Animated.View style={[styles.block,{opacity:this.state.opacity}]}>
				<Animated.View style={{marginLeft:this.state.left}}>
					<Image style={styles.bottle} source={Bottle} />
				</Animated.View>
				<Animated.View style={{marginRight:this.state.right}}>
					<Image style={this.props.i<1 ? styles.text1 : styles.text2} source={this.props.i<1 ? Text1 : Text2} />
				</Animated.View>
			</Animated.View>
		);
	}
}
