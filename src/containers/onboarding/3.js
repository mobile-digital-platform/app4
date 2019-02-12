import React,{Component} from 'react';
import {Animated,Easing,Image,ScrollView,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Check	from '../../../assets/onboarding_screen/3/check.png';
import Target	from '../../../assets/onboarding_screen/3/target.png';

const styles = EStyleSheet.create({
	container: {
		height: 200, width: 120,
		// backgroundColor: '#d20',
	},
	check: {
		height: 200, width: 120,
	},
	block: {
		position: 'absolute', top: 70, left: 30,
		height: 60, width: 60,
	},
	target: {
		height: 60, width: 60,
	},
});

const wait = 500;
const duration = [
	1200,
	1200,
	1700,
];

export default class Onboarding2 extends Component {
	state = {
		value: new Animated.Value(0),
		top: 70,
		left: 30,
		played: false,
	};
	// Верхние левые точки, по которым двигается фокус
	position = [
		{x:30,y: 70},
		{x: 9,y: 37},
		{x:50,y: 27},
		{x: 4,y:128},
	];

	componentDidUpdate(prev_props) {
		// Проигрываем, если до этого еще не играли и фокус переключился
		if(!this.state.played && !prev_props.focus && this.props.focus) {
			this.setState({
				played: true,

				top: this.state.value.interpolate({
					inputRange: [0,1,2,3],
					outputRange: this.position.map(e => e.y),
				}),
				left: this.state.value.interpolate({
					inputRange: [0,1,2,3],
					outputRange: this.position.map(e => e.x),
				}),
			});

			// Передвигаем фокус туда-сюда по чеку
			setTimeout(_ => {
				this.animation = Animated.sequence([
					Animated.timing(this.state.value,{
						toValue: 1,
						duration: duration[0],
						easing: Easing.bezier(0.6,0,0.4,1),
					}),
					Animated.timing(this.state.value,{
						toValue: 2,
						duration: duration[1],
						easing: Easing.bezier(0.6,0,0.4,1),
					}),
					Animated.timing(this.state.value,{
						toValue: 3,
						duration: duration[2],
						easing: Easing.bezier(0.7,0,0.3,1),
					}),
				]);
				this.animation.start();
			},wait);
		}
	}
	componentWillUnmount() {
		this.animation?.stop();
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.check} source={Check} />
				<Animated.View style={[styles.block,{top:this.state.top,left:this.state.left}]}>
					<Image style={styles.target} source={Target} />
				</Animated.View>
			</View>
		);
	}
}
