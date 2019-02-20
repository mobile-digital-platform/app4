import React,{Component} from 'react';
import {Platform,FlatList,KeyboardAvoidingView,Text,TextInput,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import address from '../../../services/address';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		padding: 20, paddingBottom: 0,
	},
	input: {
		height: 50,
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

export default withNavigation(class Changeaddress extends Component {
	constructor(props) {
		super(props);

		this.input = React.createRef();
		this.state = {
			address: '',
			address_obj: {},
			suggest: [],
		};
	}

	componentDidMount() {
		this.input.current.focus();
		let address = this.props.user.address_obj.full;
		if(address?.length) this.change_text(address);
	}

	change_text = async (value) => {
		this.setState({address:value});
		if(value.trim().length)	this.setState({suggest:await address(value.trim())});
		else					this.setState({suggest:[]});
	}
	select = (address_obj) => {
		this.props.update_user({
			address: address_obj.full,
			address_obj,
		});
		this.props.navigation.goBack();
	}

	render_item = ({item}) => (
		<TouchableOpacity style={styles.item} onPress={_=>this.select(item)}>
			<Text style={styles.item_text}>{item.full}</Text>
		</TouchableOpacity>
	);

	render() {
		let state = this.state;

		let container = (
			<View style={styles.container}>
				<TextInput ref={this.input} style={styles.input} value={state.address} placeholder="Введите город, улицу..." onChangeText={this.change_text} />
				{state.address.trim().length ? (
					<FlatList
						keyboardShouldPersistTaps='always'
						style={styles.list}
						data={state.suggest}
						renderItem={this.render_item}
						// ItemSeparatorComponent={Separator}
						keyExtractor={item => ''+item.id}
					/>
				) : (
					<Text style={styles.tint}>Начните писать адрес доставки, а потом выберите его из вариантов, которые появятся ниже.</Text>
				)}
			</View>
		);

		return Platform.select({
			ios: (<KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={80} style={{flex:1}}>{container}</KeyboardAvoidingView>),
			android: (container),
		});
	}
});
