import React,{Component} from 'react';
import {Platform,FlatList,Image,TouchableOpacity,Text,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import Cross from '../../../assets/ui/cross.png';

import SubTitle from '../../templates/subtitle';

const styles = EStyleSheet.create({
	container: {
		marginBottom: 30,
		padding: 30,
		borderRadius: 20,
		backgroundColor: '#f4f4f4',
	},
	save: {
		marginTop: 15, padding: 15,
		borderRadius: 100,
		backgroundColor: '$red',
	},
	save_text: {
		color: '#fff',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
	},
});

export default withNavigation(class LoyaltyCardsList extends Component {
	state = {
		data: [],
	};

	componentDidMount() {
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
				<SubTitle style={{marginBottom:10}} text="Карты лояльности" />
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

const item_styles = EStyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 15,
	},
	image: {
		height: 40, width: 40,
		borderRadius: 20,
		backgroundColor: '#ddd',
	},
	area: {
		flex: 1,
		justifyContent: 'space-between',
		marginLeft: 10,
		// backgroundColor: '#ddd',
	},
	title: {
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 14,
	},
	about: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginTop: 5,
	},
	number: {
		flex: 1,
		paddingTop: 2,
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
	remove: {
		marginLeft: 10,
	},
	remove_image: {
		height: 14, width: 14,
	},
});

const Item = ({data,retailer_list,remove}) => {
	let retailer = retailer_list?.find(e => e.id==data.retailer_id) || {id:0};

	for(let i=data.number.length-1; i>3; i--) if(!(i%4)) {
		data.number = data.number.substring(0,i)+' '+data.number.substring(i);
	}

	return (
		<View style={item_styles.container}>
			<Image style={item_styles.image} source={{uri:retailer.image_url}} />
			<View style={item_styles.area}>
				<Text style={item_styles.title}>{retailer.title}</Text>
				<View style={item_styles.about}>
					<Text style={item_styles.number} numberOfLines={1}>{data.number}</Text>
					<TouchableOpacity style={item_styles.remove} onPress={_=>remove(retailer.id)}>
						<Image style={item_styles.remove_image} source={Cross} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const empty_styles = EStyleSheet.create({
	container: {
		paddingVertical: 10,
	},
	text: {
		fontSize: 12, fontFamily: 'GothamPro',
		lineHeight: 14,
	},
});

const Empty = () => (
	<View style={empty_styles.container}>
		<Text style={empty_styles.text}>Добавьте карты лояльности торговых сетей, чтобы ваши покупки автоматически учитывались в акциях.</Text>
	</View>
);
