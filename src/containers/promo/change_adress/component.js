import React,{Component} from 'react';
import {Platform,FlatList,KeyboardAvoidingView,Text,TextInput,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import adress from '../../../services/adress';

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

export default withNavigation(class ChangeAdress extends Component {
	constructor(props) {
		super(props);

		this.input = React.createRef();
		this.state = {
			adress: '',
			suggest: [],
		};
	}

	componentDidMount() {
		this.input.current.focus();
		let adress = this.props.adress.complete;
		if(adress?.length) {
			this.change_text(adress);
		}
	} 

	change_text = async (value) => {
		this.setState({adress:value});
		if(value.trim().length)	this.setState({suggest: await adress(value)});
		else this.setState({suggest:[]});
	}
	select = (adress) => {
		this.props.update_user({adress});
		this.props.navigation.goBack();
	}

	render_item = ({item}) => (
		<TouchableOpacity style={styles.item} onPress={_=>this.select(item)}>
			<Text style={styles.item_text}>{item.complete}</Text>
		</TouchableOpacity>
	);

	render() {
		let state = this.state;

		let container = (
			<View style={styles.container}>
				<TextInput ref={this.input} style={styles.input} value={state.adress} placeholder="Введите адрес доставки" onChangeText={this.change_text} />
				{state.adress.trim().length ? (
					<FlatList
						keyboardShouldPersistTaps='always'
						style={styles.list}
						data={state.suggest}
						renderItem={this.render_item}
						// ItemSeparatorComponent={Separator}
						keyExtractor={item => ''+item.id}
					/>
				) : (
					<Text style={styles.tint}>Начните писать адрес доставки, а потом выберите его из вариантов, которые появятся ниже.Примеры указания адресов: (г Уфа Ростовская 18 стр А кв 311, г Уфа Ростовская 18 к 1 кв 311)</Text>
				)}
			</View>
		);

		return Platform.select({
			ios: (<KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={80} style={{flex:1}}>{container}</KeyboardAvoidingView>),
			android: (container),
		});
	}
});
