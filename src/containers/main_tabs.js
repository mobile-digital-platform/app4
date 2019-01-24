import React,{Component} from 'react';
import {Animated,Easing,Platform,StyleSheet,Text,TouchableOpacity,View} from 'react-native';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	tab_bar: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'baseline',
		height: 45, width: 282,
		marginBottom: 10,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
	},
	background_tab: {
		position: 'absolute', top: 0, left: 0,
		height: 45,
		marginTop: -1,
		borderRadius: 100,
		backgroundColor: 'red',
	},
	tab: {
		justifyContent: 'center',
		height: 45,
		paddingVertical: 10, paddingHorizontal: 30,
		zIndex: 1,
	},
	text: {
		paddingTop: Platform.select({ios:3,android:0}),
		fontSize: 16, fontFamily: 'GothamPro',
	},
	text_selected: {
		color: '#fff',
		fontFamily: 'GothamPro-Medium',
	},
});

export default class MainTabs extends Component {
	state = {
		animation: null,
		value: new Animated.Value(0),
		width: 145,
		left: 0,
	};
	duration = 200;

	componentDidMount() {
		this.setState({
			width: this.state.value.interpolate({
				inputRange: [0,1],
				outputRange: [145,148],
			}),
			left: this.state.value.interpolate({
				inputRange: [0,1],
				outputRange: [0,136],
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
					<TouchableOpacity style={[styles.tab,selected ? [styles.tab_selected,{marginRight:-10}] : {}]} onPress={_=>send(false)}>
						<Text style={[styles.text,selected ? styles.text_selected : {}]}>Все акции</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.tab,selected ? {} : [styles.tab_selected,{marginLeft:-10}]]} onPress={_=>send(true)}>
						<Text style={[styles.text,selected ? {} : styles.text_selected]}>Мои акции</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
