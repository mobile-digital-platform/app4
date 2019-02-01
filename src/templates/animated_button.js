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
		height: 50, width: '100%',
		padding: 15,
		borderRadius: 40,
	},
	button_text: {
		paddingTop: Platform.select({ios:3,android:0}),
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
		position: 'absolute', bottom: 3.5, right: 9.5,
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
		this.setState({
			button_width: this.state.button_width_value.interpolate({
				inputRange: [0,1],
				outputRange: ['17%','100%'],
			}),

			// tick_left: this.state.tick_size_value.interpolate({
			// 	inputRange: [0,1],
			// 	outputRange: [ 8*EStyleSheet.value("$scale"),12*EStyleSheet.value("$scale")],
			// }),
			// tick_right: this.state.tick_size_value.interpolate({
			// 	inputRange: [0,1],
			// 	outputRange: [13*EStyleSheet.value("$scale"),20*EStyleSheet.value("$scale")],
			// }),
		});
	}
	componentDidUpdate(prev_props) {
		if(prev_props.state == 'ready' && this.props.state == 'waiting') this.shrink();
		if(['waiting','end'].indexOf(prev_props.state)>=0 && this.props.state == 'ready') this.revert();
	}
	componentWillUnmount() {
		this.animation?.stop();
	}

	revert = () => {
		this.setState({state:'ready'});
	}
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
	end = () => {
		this.setState({state:'ended'});
		if(this.props.state == 'ready') this.revert();
		if(this.props.on_end) this.props.on_end();
	}

	on_press = () => {
		if(this.props.state == 'ready') this.props.on_press();
	}

	render() {
		let props = this.props,state = this.state;

		let button_styles = [
			styles.button,
			props.style?.container,
			props.active ? styles.active_button : styles.passive_button,
			{width:this.state.button_width},
		];
		let button_text_styles = [
			styles.button_text,
			props.style?.text,
			props.active ? styles.active_button_text : styles.passive_button_text,
		];

		if(['ready','shrinking'].indexOf(state.state)>=0) {
			return (
				<TouchableOpacity style={styles.container} onPress={this.on_press}>
					<Animated.View style={button_styles}>
						<Text style={button_text_styles}>{props.children}</Text>
					</Animated.View>
				</TouchableOpacity>
			)
		} else if(state.state == 'rotating') {
			return (
				<View style={styles.container}>
					<AnimatedCircularProgress
						ref={ref => this.circular_progress=ref}
						size={styles.button.height}
						width={styles.button.height/10}
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
				<View style={styles.container}>
					<Animated.View style={button_styles}>
					{props.state == 'end' ? (
						<View style={styles.tick_area}>
							{/*<View style={tick_styles} />*/}
							<Animated.View style={[styles.tick_left]} />
							<Animated.View style={[styles.tick_right]} />
						</View>
					) : null}
					{/*props.state == 'ready' ? (
						<Text style={button_text_styles}>{props.children}</Text>
					) : null*/}
					</Animated.View>
				</View>
			);
		}
	}
}
