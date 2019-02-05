import React,{Component} from 'react';
import {Animated,Easing,Platform,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Svg,Path,G} from 'react-native-svg';
import {AnimatedCircularProgress,CircularProgress} from 'react-native-circular-progress';

const styles = EStyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		marginBottom: 10,
		// backgroundColor: '#ddd',
	},
	button: {
		alignItems: 'center',
		width: '100%',
		padding: 15,
		borderRadius: 40,
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
	tick_left: {
		position: 'absolute', bottom: 3.5, right: Platform.select({ios:9.5,android:10.5}),
		height: 5, width: 12,
		borderRadius: 5,
		backgroundColor: '#fff',
		transform: [{rotate:'45deg'}],
	},
	tick_right: {
		position: 'absolute', bottom: 6, left: 3.5,
		height: 5, width: 20,
		borderRadius: 5,
		backgroundColor: '#fff',
		transform: [{rotate:'-45deg'}],
	},
});

const linear = {
	duration:  300,
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
		this.circular_progress;

		this.state = {
			layout: null,
			height: 50,

			button_width_value: new Animated.Value(1),
			button_width: '100%',

			tick_size_value: new Animated.Value(0),

			// tick_left:   8*EStyleSheet.value("$scale"),
			// tick_right: 13*EStyleSheet.value("$scale"),

			state: 'ready',
			main_color: styles.active_button.backgroundColor,
			back_color: styles.passive_button_text.color,
		};
	}

	componentDidMount() {
		// this.setState({
			// tick_left: this.state.tick_size_value.interpolate({
			// 	inputRange: [0,1],
			// 	outputRange: [ 8*EStyleSheet.value("$scale"),12*EStyleSheet.value("$scale")],
			// }),
			// tick_right: this.state.tick_size_value.interpolate({
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
				button_width: this.state.button_width_value.interpolate({
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
		this.setState({
			state: 'shrinking',
			tick_size_value: new Animated.Value(0),
		});

		// Сворачиваем кнопку
		this.animation = Animated.timing(this.state.button_width_value,{
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
		this.animation = Animated.timing(this.state.button_width_value,{
			toValue: 1,
			duration: linear.duration,
			easing: linear.easing,
		}).start(this.end);
		// Animated.timing(this.state.tick_size_value,{
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
			{height:state.height*EStyleSheet.value("$scale")},
		];
		let button_styles = [
			styles.button,
			props_styles.button,
			props.active ? styles.active_button : styles.passive_button,
			{width:this.state.button_width},
		];
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
					<Animated.View style={button_styles}>
						<Text style={button_text_styles}>{props.children}</Text>
					</Animated.View>
				</TouchableOpacity>
			)
		} else if(state.state == 'shrinking') {
			return (
				<View style={container_styles}>
					<Animated.View style={button_styles}>
						<Text style={button_text_styles} />
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
							{/*<View style={tick_styles} />*/}
							<Animated.View style={[styles.tick_left]} />
							<Animated.View style={[styles.tick_right]} />
						</View>
					) : null}
					</Animated.View>
				</View>
			);
		}
	}
}
