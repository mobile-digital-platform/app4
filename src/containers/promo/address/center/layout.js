import React,{Component} from 'react';
import {FlatList,ImageBackground,Keyboard,ScrollView,Text,TouchableOpacity,View,Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import AnimatedButton	from '../../../../templates/animated_button';
import Input			from '../../../../templates/input';
import InputPhone		from '../../../../templates/input_phone';
import Select			from '../../../../templates/select';

import alert 			from '../../../../services/alert';

import YandexMaps		from './map';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	map_area: {
		flex: 1,
		width: '100%',
		backgroundColor: '#ccc',
	},
	bottom_area: {
		paddingVertical: 10, paddingHorizontal: 20,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},

	button: {
		alignItems: 'center',
		width: '100%',
		marginVertical: 5, padding: 15,
		borderRadius: 100,
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
});

export default withNavigation(class GetPrizeCenterLayout extends Component {
	state = {
		center: 1,
		ready: false,
	};

	send = async () => {
		if(this.state.center<0) {
			await alert("Выберите центр выдачи призов");
			return;
		}
		await this.props.send_data({center:this.state.center});
	}

	render() {
		let {props,state} = this;

		let center_list = props.list.map(e => ({id:e.id,title:e.name}));

		let button_styles = [
			styles.button,
			state.ready ? styles.active_button : styles.passive_button,
		];
		let button_text_styles = [
			styles.button_text,
			state.ready ? styles.active_button_text : styles.passive_button_text,
		];

		return (
			<View ref={this.scroll} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" style={styles.container}>
				<View style={styles.map_area}>
					<YandexMaps list={props.list} />
				</View>
				<View style={styles.bottom_area}>
					<Select
						title="Выберите центр выдачи"
						empty_title={props.loading ? 'Выберите центр выдачи' : 'Центров выдачи этого приза нет'}
						value={state.center}
						data={center_list}
						update={center => this.setState({center})}
						error={state.center_error}
					/>
					<TouchableOpacity style={button_styles} onPress={this.send}>
						<Text style={button_text_styles}>Дальше</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
})
