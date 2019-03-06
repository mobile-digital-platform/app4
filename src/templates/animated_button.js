import React,{Component} from 'react';
import {Animated,Easing,Platform,Image,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Svg,Line} from 'react-native-svg';
import {AnimatedCircularProgress,CircularProgress} from 'react-native-circular-progress';

import Tick from '../../assets/ui/tick.png';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		marginBottom: 10,
		// backgroundColor: '#ddd',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%', width: '100%',
		borderRadius: 40,
		backgroundColor: '#ddd',
	},
	button_text: {
		fontSize: 16, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
		lineHeight: 19,
	},

	active_button: {
		backgroundColor: '$red',
	},
	active_button_text: {
		color: '#fff',
	},
	passive_button: {
		backgroundColor: '#f1f1f1',
	},
	passive_button_text: {
		color: '#d5d5d5',
	},

	tick_area: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		height: 20, width: 20,
		// backgroundColor: '#999',
	},
	tick: {
		borderLeftWidth: 5, borderBottomWidth: 5, borderColor: '#fff',
		backgroundColor: 'transparent',
		transform: [{rotate:'-45deg'}],
	},
	tick_image: {
		height: 25, width: 25,
	},
	tick_left: {
		position: 'absolute', bottom: 3.5, right: 11,
		height: 5, width: 12,
		borderRadius: 5,
		backgroundColor: '#fff',
		transform: [{rotate:'45deg'}],
	},
	tick_right: {
		position: 'absolute', bottom: 6, left: 6,
		height: 5, width: 20,
		borderRadius: 5,
		backgroundColor: '#fff',
		transform: [{rotate:'-45deg'}],
	},
});

const linear = {
	duration: 300,
	easing: Easing.linear,
}
const circular = {
	duration: 2000,
	easing: Easing.bezier(0.75,0,0.25,1),
};
const end_timeout = 500;

/*
Состояния:
0 - начальное
1 - сужение
2 - вращение
3 - расширение
4 - конец
*/

export default class AnimatedButton extends Component {
	constructor(props) {
		super(props);

		this.animation;
		this.value = {
			button_width: new Animated.Value(1),
			tick_size: new Animated.Value(0),
		};
		this.circular_progress;

		this.state = {
			layout: null,
			height: 50*EStyleSheet.value("$scale"),

			button_width: '100%',

			// tick_left:   8*EStyleSheet.value("$scale"),
			// tick_right: 13*EStyleSheet.value("$scale"),

			state: 'ready',
			main_color: styles.active_button.backgroundColor,
			back_color: styles.passive_button_text.color,
		};
	}

	componentDidMount() {
		// this.setState({
			// tick_left: this.value.tick_size.interpolate({
			// 	inputRange: [0,1],
			// 	outputRange: [ 8*EStyleSheet.value("$scale"),12*EStyleSheet.value("$scale")],
			// }),
			// tick_right: this.value.tick_size.interpolate({
			// 	inputRange: [0,1],
			// 	outputRange: [13*EStyleSheet.value("$scale"),20*EStyleSheet.value("$scale")],
			// }),
		// });
	}
	componentDidUpdate(prev_props,prev_state) {
		// Кнопка расположилась на экране
		if(!prev_state.layout && this.state.layout) {
			let {height,width} = this.state.layout;
			this.setState({
				height,
				button_width: this.value.button_width.interpolate({
					inputRange: [0,1],
					outputRange: [height,width],
				}),
			});
		}
		// Началось сужение
		if(prev_props.state == 'ready' && this.props.state == 'waiting') this.shrink();

		// Кнопка снова готова
		if(['waiting','end'].indexOf(prev_props.state)>=0 && this.props.state == 'ready') this.revert();
	}
	componentWillUnmount() {
		this.animation?.stop();
	}

	// Обращение готовое состояние
	revert = () => {
		this.setState({state:'ready'});
	}
	// Сужение
	shrink = () => {
		this.value.tick_size = new Animated.Value(0);
		this.setState({state:'shrinking'});

		// Сворачиваем кнопку
		this.animation = Animated.timing(this.value.button_width,{
			toValue: 0,
			duration: linear.duration,
			easing: linear.easing,
		}).start(_=>this.rotate(true));
	}
	// Вращение
	rotate = (first = false) => {
		// Прокручиваем в первый раз, затем, если все еще ждем результата
		if(first || this.props.state == 'waiting') {
			// Начинаем крутить крутилку
			this.setState({state:'rotating'});

			// Меняем цвета на круге
			this.setState(state => ({
				main_color: state.back_color,
				back_color: state.main_color,
			}));

			// Запускаем заново
			this.circular_progress?.reAnimate(0,100,circular.duration,circular.easing);

			setTimeout(this.rotate,circular.duration);

		// Результат получен
		} else {
			this.expand();
		}
	}
	// Расширение
	expand = () => {
		this.setState({state:'expanding'});

		// Расширяем кнопку и галочку
		this.animation = Animated.timing(this.value.button_width,{
			toValue: 1,
			duration: linear.duration,
			easing: linear.easing,
		}).start(this.end);
		// Animated.timing(this.value.tick_size,{
		// 	toValue: 1,
		// 	duration: linear.duration,
		// 	easing: linear.easing,
		// });
	}
	// Конец
	end = () => {
		this.setState({state:'ended'});
		if(this.props.state == 'ready') this.revert();
		if(this.props.on_end) setTimeout(this.props.on_end,this.props.end_timeout ?? end_timeout);
	}

	on_press = () => {
		if(this.props.state == 'ready') this.props.on_press();
	}

	render() {
		let {props,state} = this;

		const props_styles = EStyleSheet.create({
			container:	props.style?.container	?? {},
			button:		props.style?.button		?? {},
			text:		props.style?.text		?? {},
		});

		let container_styles = [
			styles.container,
			props_styles.container,
			{height:state.height},
		];
		let button_styles = [
			styles.button,
			props_styles.button,
			props.active ? styles.active_button : styles.passive_button,
			{height:state.height},
		];
		if(state.state != 'ready') button_styles.push({width:this.state.button_width});
		let button_text_styles = [
			styles.button_text,
			props_styles.text,
			props.active ? styles.active_button_text : styles.passive_button_text,
		];

		if(state.state == 'ready') {
			return (
				<TouchableOpacity style={container_styles} onPress={this.on_press} onLayout={e => {
					if(!this.state.layout) this.setState({layout:e.nativeEvent.layout})
				}}>
					<View style={button_styles}>
						<Text style={button_text_styles}>{props.children}</Text>
					</View>
				</TouchableOpacity>
			)
		} else if(state.state == 'shrinking') {
			return (
				<View style={container_styles}>
					<Animated.View style={button_styles}>
						<Text style={button_text_styles}> </Text>
					</Animated.View>
				</View>
			)
		} else if(state.state == 'rotating') {
			return (
				<View style={container_styles}>
					<AnimatedCircularProgress
						ref={ref => this.circular_progress=ref}
						size={state.layout.height}
						width={state.layout.height/10}
						prefill={0}
						fill={100}
						tintColor={state.main_color}
						backgroundColor={state.back_color}
						rotation={0}
						duration={circular.duration}
						easing={circular.easing}
						arcSweepAngle={360}
					/>
				</View>
			);
		} else if(['expanding','ended'].indexOf(state.state)>=0) {
			return (
				<View style={container_styles}>
					<Animated.View style={button_styles}>
					{props.state == 'end' ? (
						<View style={styles.tick_area}>
							{/*
							<View style={tick_styles} />
							<Animated.View style={[styles.tick_left]} />
							<Animated.View style={[styles.tick_right]} />
							*/}
							<Image style={styles.tick_image} source={Tick} />
							{/*
							<Svg height='30' width='30'>
								<Line
									x1={ 0} y1={14}
									x2={10} y2={20}
									stroke='#fff'
									strokeWidth='5'
								/>
								<Line
									x1={20} y1={ 6}
									x2={10} y2={20}
									stroke='#fff'
									strokeWidth='5'
								/>
							</Svg>
							*/}
						</View>
					) : null}
					</Animated.View>
				</View>
			);
		}
	}
}
