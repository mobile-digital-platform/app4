import React,{Component} from 'react';
import {Animated,Easing,Image,ScrollView,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Image1	from '../../../assets/onboarding_screen/2/icon1.png';
import Image2	from '../../../assets/onboarding_screen/2/icon2.png';
import Image3	from '../../../assets/onboarding_screen/2/icon3.png';

const styles = EStyleSheet.create({
	container: {
		height: 210, width: 210,
		margin: -5,
		// backgroundColor: '#d20',
	},
	scroll: {
		flex: 1,
	},
	block: {
		height: 95, width: 200,
		margin: 5,
	},
	image: {
		height: 95, width: 200,
	},
});

const wait = 500;		// Ожидание в начале
const interval = 3000;	// Время между прокрутками
const duration = 1500;	// Время прокрутки

export default class Onboarding2 extends Component {
	state = {
		top_value: new Animated.Value(0),
		top: 0,
		position: 0,
		played: false,
	};

	componentDidUpdate(prev_props) {
		// Проигрываем, если до этого еще не играли и фокус переключился
		if(!this.state.played && !prev_props.focus && this.props.focus) {
			this.setState({
				played: true,

				top: this.state.top_value.interpolate({
					inputRange: [0,1],
					outputRange: [0,-105*EStyleSheet.value("$scale")],
				}),
			});

			setTimeout(_ => {
				// Первая прокрутка сразу
				this.animation = Animated.timing(this.state.top_value,{
					toValue: 1,
					duration: duration,
					easing: Easing.bezier(0.75,0,0.5,0.75),
				}).start();
				this.setState(state => ({position:+!state.position}));

				// Затем постоянно крутим в разные стороны к 0 или к 1
				setInterval(_ => {
					this.animation = Animated.timing(this.state.top_value,{
						toValue: !this.state.position,
						duration: duration,
						easing: Easing.bezier(0.75,0,0.5,0.75),
					});
					this.animation.start();
					this.setState(state => ({position:+!state.position}));
				},interval);
			},wait);
		}
	}
	componentWillUnmount() {
		this.animation?.stop();
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView ref={ref => this.scroll=ref} style={styles.scroll}>
					<Animated.View style={{top:this.state.top}}>
						<View style={styles.block}><Image style={styles.image} source={Image1} /></View>
						<View style={styles.block}><Image style={styles.image} source={Image2} /></View>
						<View style={styles.block}><Image style={styles.image} source={Image3} /></View>
					</Animated.View>
				</ScrollView>
			</View>
		);
	}
}
