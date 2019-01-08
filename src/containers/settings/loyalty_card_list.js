import React,{Component} from 'react';
import {StyleSheet,FlatList,Image,TouchableOpacity,Text,View} from 'react-native';
import {withNavigation} from 'react-navigation';

import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
	container: {
		padding: 30,
		borderRadius: 20,
		backgroundColor: '#f4f4f4',
	},
	title: {
		marginBottom: 10,
		color: '#bbb',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
		textTransform: 'uppercase',
	},
	save: {
		marginTop: 15, padding: 15,
		borderRadius: 100,
		backgroundColor: '#f40000',
	},
	save_text: {
		paddingTop: 3,
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
	},
});

export default withNavigation(class LoyaltyCardsList extends Component {
	state = {
		data: [],
	};

	componentDidMount() {
		console.log(this.props.retailer_list);
	}

	componentDidUpdate(prev_props) {
		if(!Object.is(this.props,prev_props)) {
			this.setState({data:this.props.user.loyalty_card});
		}
	}

	render() {
		let props = this.props;
		let navigation = this.props.navigation;
		let state = this.state;

		let list = props.user.loyalty_card;

		return (
			<View style={styles.container}>
				<Text style={styles.title}>Карты лояльности</Text>
				<FlatList
					data={list}
					renderItem={({item}) => <Item data={item} retailer_list={props.retailer_list} remove={props.remove} />}
					keyExtractor={item => ''+item.retailer_id}
					ListEmptyComponent={_ => <Empty/>}
				/>
				<TouchableOpacity style={styles.save} onPress={_ => navigation.push('settings_add_loyalty_card')}>
					<Text style={styles.save_text}>Добавить карту</Text>
				</TouchableOpacity>
			</View>
		);
	}
});

const item_styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingVertical: 25,
	},
	image: {
		height: 50, width: 50,
		borderRadius: 25,
		backgroundColor: '#ddd',
	},
	area: {
		flex: 1,
		justifyContent: 'space-between',
		marginLeft: 10,
		// backgroundColor: '#ddd',
	},
	title: {
		paddingTop: 5,
		fontSize: 16, fontFamily: 'GothamPro',
	},
	about: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	number: {
		marginBottom: 3,
		fontSize: 16, fontFamily: 'GothamPro-Medium',
	},
	remove: {
		color: '#ee0007',
		fontSize: 16,
	},
});

const Item = ({data,retailer_list,remove}) => {
	let retailer = retailer_list?.find(e => e.id==data.retailer_id) || {id:0};

	return (
		<View style={item_styles.container}>
			<Image style={item_styles.image} source={{uri:retailer.image_url}} />
			<View style={item_styles.area}>
				<Text style={item_styles.title}>{retailer.title}</Text>
				<View style={item_styles.about}>
					<Text style={item_styles.number}>{data.number}</Text>
					<TouchableOpacity onPress={_=>remove(retailer.id)}>
						<Text style={item_styles.remove}><Icon name="close" style={{color:'red'}} size={30} /></Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const empty_styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
	},
	text: {
		fontSize: 14, fontFamily: 'GothamPro',
<<<<<<< HEAD
		lineHeight: 16,
=======
>>>>>>> 90cb72bff6426a5f10893161faf26c9b1b2dc4da
	},
});

const Empty = () => (
	<View style={empty_styles.container}>
		<Text style={empty_styles.text}>Добавьте карты лояльности торговых сетей, чтобы ваши покупки автоматически учитывались в акциях.</Text>
	</View>
);
