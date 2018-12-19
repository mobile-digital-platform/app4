import React,{Component} from 'react';
import {Platform,StyleSheet,FlatList,Text,TextInput,TouchableOpacity,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import city from '../../../services/city';

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	input: {
		marginVertical: 10,
		paddingVertical: 15, paddingHorizontal: 20,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		fontSize: 20,
	},
	list: {
		marginVertical: 10, paddingHorizontal: 20,
	},
	item: {
		paddingBottom: 20,
	},
	item_text: {
		fontSize: 20,
	},
	tint: {
		marginVertical: 10, paddingHorizontal: 20,
		fontSize: 16,
	},
});

export default withNavigation(class ChangeCity extends Component {
	constructor(props) {
		super(props);

		this.input = React.createRef();

		this.state = {
			city_id: 0,
			city_name: '',
			suggest: [],
		};
	}

	componentDidMount() {
		this.input.current.focus();
		if(this.props.user.city>0)			this.setState({city_id:this.props.user.city,city_name:city.find_city(this.props.user.city)});
		else if(this.props.user.city_name)	this.change_text(this.props.user.city_name);
	}

	change_text = (city_name) => {
		this.setState({city_name});
		if(city_name.length)	this.setState({suggest:city.search_city(city_name.trim())});
		else					this.setState({suggest:[]});
	}
	select = (city_id,city_name) => {
		this.props.update_user({city_id,city_name});
		this.props.navigation.goBack();
	}

	render_item = ({item}) => (
		<TouchableOpacity style={styles.item} onPress={_=>this.select(item.id,item.name)}>
			<Text style={styles.item_text}>{item.name}</Text>
		</TouchableOpacity>
	);

	render() {
		let state = this.state;

		return (
			<View style={styles.container}>
				<TextInput ref={this.input} style={styles.input} value={state.city_name} placeholder="Ваш город" onChangeText={this.change_text} />
				{state.city_name.length ? (
					<FlatList
						keyboardShouldPersistTaps='always'
						style={styles.list}
						data={state.suggest}
						renderItem={this.render_item}
						// ItemSeparatorComponent={Separator}
						keyExtractor={item => ''+item.id}
					/>
				) : (
					<Text style={styles.tint}>Начните писать название вашего города, а потом выберите его из вариантов, которые появятся ниже.</Text>
				)}
			</View>
		);
	}
});
