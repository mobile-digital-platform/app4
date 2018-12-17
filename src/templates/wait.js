import React,{Component} from 'react';
import {Platform,Animated,Easing,StyleSheet,View,Text} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
	container: {
		padding: 30,
		color: '#999',
		fontSize: 20, // fontFamily: 'Roboto-Light',
		textAlign: 'center',
	},
});

export default class extends Component {
	state = {
		value: new Animated.Value(0),
		deg: '0deg',
	};

	componentDidMount() {
		Animated.loop(Animated.timing(this.state.value,{
			toValue: 1,
			duration: 10000,
			easing: Easing.linear,
			useNativeDriver: true,
		})).start();
		this.setState({deg:this.state.value.interpolate({
			inputRange: [0,1],
			outputRange: ['0deg','360deg'],
		})});
	}

	render() {
		const size = this.props.size ? this.props.size : 60;
		return (
			<Animated.Text style={[styles.container,{transform:[{rotate:this.state.deg}]},this.props.style]}>
				<Icon name="spinner" size={size} />
			</Animated.Text>
		);
	}
}
