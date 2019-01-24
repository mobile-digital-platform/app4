import React,{Component} from 'react';
import {Animated,Easing,Platform,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {Svg,Path,G} from 'react-native-svg';
import {AnimatedCircularProgress,CircularProgress} from 'react-native-circular-progress';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		marginBottom: 10,
		// backgroundColor: '#ddd',
	},
	button: {
		height: 52.5, width: '100%',
		padding: 15,
		borderRadius: 40,
	},
	button_text: {
		paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 20, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
	},

	active_button: {
		backgroundColor: '#f40000',
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
});

const duration = 3000;
const ease = Easing.ease;

export default class AnimatedButton extends Component {
	constructor(props) {
		super(props);

		this.interval;
		this.circular_progress;
		this.animation;

		this.state = {
			state: 'initial',
			width_value: new Animated.Value(1),
			width: '100%',
			main_color: '#f40000',
			back_color: '#d5d5d5',
		};
	}

	componentDidMount() {
		this.setState({
			width: this.state.width_value.interpolate({
				inputRange: [0,1],
				outputRange: ['18%','100%'],
			}),
		});
	}
	componentDidUpdate(prev_props) {
		// Переход в режим ожидания
		if(prev_props.state != 'waiting' && this.props.state == 'waiting') {

			// Сворачиваем кнопку
			if(this.animation) this.animation.stop();
			this.animation = Animated.timing(this.state.width_value,{
				toValue: 0,
				duration: 1000,
				easing: Easing.linear,
			});
			this.animation.start();

			// Начинаем крутить крутилку
			setTimeout(_ => {
				this.setState({state:'rotating'});
				this.interval = setInterval(_ => {
					// Меняем цвета на круге
					this.setState(state => ({
						main_color: state.back_color,
						back_color: state.main_color,
					}));
					// Запускаем заново
					this.circular_progress?.reAnimate(0,100,duration,ease);
				},duration);
			},1000);
		}

		// Переход в окончание
		if(prev_props.state != 'success' && this.props.state == 'success') {
			if(this.interval) clearInterval(this.interval);
			if(this.animation) this.animation.stop();
			this.animation = Animated.timing(this.state.width_value,{
				toValue: 1,
				duration: 1000,
				easing: Easing.linear,
			});
			this.animation.start();
		}

		if(this.props.state != prev_props.state) this.setState({state:this.props.state});
	}
	componentWillUnmount() {
		if(this.interval) clearInterval(this.interval);
	}

	render() {
		let props = this.props,state = this.state;

		let button_styles = [
			styles.button,
			props.active ? styles.active_button : styles.passive_button,
			{width:this.state.width},
		];
		let button_text_styles = [
			styles.button_text,
			props.active ? styles.active_button_text : styles.passive_button_text,
		];
		console.log(this.state.sector);

		return (
			<TouchableOpacity style={styles.container} onPress={props.onPress}>
			{state.state == 'rotating' ? (
				<AnimatedCircularProgress
					ref={ref => this.circular_progress=ref}
					size={52.5}
					width={5}
					prefill={0}
					fill={100}
					tintColor={state.main_color}
					backgroundColor={state.back_color}
					rotation={0}
					duration={duration}
					easing={ease}
					arcSweepAngle={360}
				/>
			) : (
				<Animated.View style={button_styles}>
				{['initial','waiting'].indexOf(state.state)>=0 ? (
					<Text style={button_text_styles}>{props.children}</Text>
				) : (
					<View style={{alignItems:'center',width:'100%'}}>
					{{
						'success': (<Tick/>),
						'error': (<Cross/>),
					}[state.state]}
					</View>
				)}
				</Animated.View>
			)}
			</TouchableOpacity>
		);
	}
}

const Tick = () => (
	<View style={{
		height: 16, width: 33,
		borderLeftWidth: 5, borderBottomWidth: 5, borderColor: '#fff',
		backgroundColor: 'transparent',
		transform: [{rotate:'-45deg'}],
	}} />
);
const Cross = () => (
	<View style={{height:22,width:22}}>
		<View style={{
			position: 'absolute', top: 9, left: -5,
			height: 5, width: 33,
			backgroundColor: '#fff',
			transform: [{rotate:'-45deg'}],
		}} />
		<View style={{
			position: 'absolute', top: 9, left: -5,
			height: 5, width: 33,
			backgroundColor: '#fff',
			transform: [{rotate:'45deg'}],
		}} />
	</View>
);
