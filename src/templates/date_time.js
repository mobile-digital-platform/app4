import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View} from 'react-native';

import Date from './date';
import Time from './time';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between', alignItems: 'stretch',
	},
	date: {
		flex: 3,
	},
	time: {
		flex: 2,
		marginLeft: 10,
	},
	error_text: {
		marginLeft: 20, marginBottom: 10,
		fontSize: 14,
		color: 'red',
	},
});

export default class DateTime extends Component {
	constructor(props) {
		super(props);

		this.input = React.createRef();

		this.state = {
			active: !!(props.value?.length),
			value: props.value ?? '',
			error: props.error,
		};
	}

	componentDidUpdate(prevProps) {
		if(!Object.is(this.props,prevProps)) {
			this.setState(state => ({
				active: state.active || this.props.value?.length,
				value: state.value || this.props.value || '',
				error: this.props.error,
			}));
		}
	}

	render() {
		let state = this.state;

		return (
			<View>
				<View style={styles.container}>
					<Date title="Дата" value={this.props.date} style={styles.date}/>
					<Time title="Время" value={this.props.time} style={styles.time}/>
				</View>
				{state.error ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
			</View>
		);
	}
}