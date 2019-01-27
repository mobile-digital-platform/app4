import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View,Dimensions} from 'react-native';

import Date		from './date';
import Time		from './time';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
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

		this.state = {
			date:		 		props.date,
			time: 		 		props.time,
			date_error:	 		props.dateError,
			time_error:  		props.timeError,
			date_time_error: 	props.error,
		};
	}

	componentDidUpdate(prevProps) {
		if(!Object.is(this.props,prevProps)) {
			this.setState(state => ({
				date:		 		this.props.date,
				time: 		 		this.props.time,
				date_error:			this.props.dateError,
				time_error:  		this.props.timeError,
				date_time_error:    this.props.error,
			}));
		}
	}
	update = (data) =>{
		//this.setState(data);
		this.props.update(data);
	}
	
	render() {
		let state = this.state;
		return (
			<View>
				<View style={styles.container}>
					<Date
						title="Дата"
						style={styles.date}
						value={state.date}
						update={(value) => this.update({date:value})}
						error={state.date_error}
					/>
					<Time
						title="Время"
						style={styles.time}
						value={state.time}
						update={(value) => this.update({time:value})}
						error={state.time_error}
					/>
				</View>
				{state.error ? (<Text style={styles.error_text}>{state.error}</Text>) : null}
			</View>
		);
	}
}