import React,{Component} from 'react';
import {Platform,FlatList,KeyboardAvoidingView,Text,TextInput,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import city from '../../../services/city';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		padding: 20, paddingBottom: 0,
	},
	input: {
		marginVertical: 10,
		paddingTop: 18, paddingBottom: 15,
		paddingHorizontal: 20,
		borderWidth: 1, borderColor: '#ccc',
		borderRadius: 100,
		fontSize: 14, fontFamily: 'GothamPro',
	},
	list: {
		marginVertical: 10, paddingHorizontal: 20,
	},
	item: {
		paddingBottom: 20,
	},
	item_text: {
		fontSize: 14, fontFamily: 'GothamPro',
	},
	tint: {
		marginVertical: 10, paddingHorizontal: 20,
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 14,
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
		if(city_name.trim().length)	this.setState({suggest:city.search_city(city_name.trim())});
		else						this.setState({suggest:[]});
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

		let container = (
			<View style={styles.container}>
				<TextInput ref={this.input} style={styles.input} value={state.city_name} placeholder="Ваш город" onChangeText={this.change_text} />
				{state.city_name.trim().length ? (
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

		return Platform.select({
			ios: (<KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={80} style={{flex:1}}>{container}</KeyboardAvoidingView>),
			android: (container),
		});
	}
});
