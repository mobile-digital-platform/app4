import React,{Component} from 'react';
import {Animated,Easing,Platform,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
	container: {
		alignItems: 'center',
	},
	tab_bar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		height: 40, width: 250,
		marginBottom: 10,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
	},
	background_tab: {
		position: 'absolute', top: 0, left: 0,
		height: 40,
		marginTop: -1, marginLeft: -1,
		borderRadius: 100,
		backgroundColor: '$red',
	},
	tab: {
		justifyContent: 'center',
		height: 40,
		paddingVertical: 10, paddingHorizontal: 28,
		zIndex: 1,
	},
	left_tab: {
		width: 130,
	},
	right_tab: {
		width: 134,
	},
	text: {
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
	text_selected: {
		color: '#fff',
	},
});

export default class MainTabs extends Component {
	state = {
		animation: null,
		value: new Animated.Value(0),
		// width: 133*EStyleSheet.value('$scale'),
		// left: 0,
	};
	duration = 200;

	componentDidMount() {
		this.setState({
			width: this.state.value.interpolate({
				inputRange: [0,1],
				outputRange: [130*EStyleSheet.value('$scale'),125*EStyleSheet.value('$scale')],
			}),
			left: this.state.value.interpolate({
				inputRange: [0,1],
				outputRange: [0,125*EStyleSheet.value('$scale')],
			}),
		});
	}

	componentDidUpdate(prev_props) {
		// Переключили со всех на мои
		if(!prev_props.my && this.props.my) {
			let animation = Animated.timing(this.state.value,{
				toValue: 1,
				duration: this.duration,
				easing: Easing.linear,
			});
			this.setState({animation});
			animation.start();
		}
		// Переключили с моих на все
		if(prev_props.my && !this.props.my) {
			let animation = Animated.timing(this.state.value,{
				toValue: 0,
				duration: this.duration,
				easing: Easing.linear,
			});
			this.setState({animation});
			animation.start();
		}
	}

	render() {
		let props = this.props,state = this.state;

		let {my,send} = this.props;
		let selected = !my;

		return (
			<View style={styles.container}>
				<View style={styles.tab_bar}>
					<Animated.View style={[styles.background_tab,{width:state.width,left:state.left}]} />
					<TouchableOpacity style={[styles.tab,styles.left_tab,selected ? [styles.tab_selected,{marginRight:-10}] : {}]} onPress={_=>send(false)}>
						<Text style={[styles.text,selected ? styles.text_selected : {}]}>Все акции</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.tab,styles.right_tab,selected ? {} : [styles.tab_selected,{marginLeft:-10}]]} onPress={_=>send(true)}>
						<Text style={[styles.text,selected ? {} : styles.text_selected]}>Мои акции</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
