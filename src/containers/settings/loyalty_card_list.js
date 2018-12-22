import React,{Component} from 'react';
import {StyleSheet,FlatList,TouchableOpacity,Text,View} from 'react-native';
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
		fontSize: 14, fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	save: {
		marginTop: 15, padding: 15,
		borderRadius: 100,
		backgroundColor: 'red',
	},
	save_text: {
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
	},
});

export default withNavigation(class LoyaltyCardsList extends Component {
	state = {
		data: [],
	};

	componentDidMount() {
		console.log(this.props.user.loyalty_card);
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

		return (
			<View style={styles.container}>
				<Text style={styles.title}>Карты лояльности</Text>
				<FlatList
					data={state.data}
					renderItem={({item}) => (<Item data={item} />)}
					keyExtractor={item => ''+item.id}
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
		borderRadius: 50,
		backgroundColor: '#ddd',
	},
	area: {
		flex: 1,
		justifyContent: 'space-between',
		marginLeft: 10,
		// backgroundColor: '#ddd',
	},
	title: {
		fontSize: 16,
	},
	about: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	number: {
		marginBottom: 3,
		fontSize: 16, fontWeight: 'bold',
	},
	remove: {
		color: '#ee0007',
		fontSize: 16,
	},
});

const Item = (props) => (
	<View style={item_styles.container}>
		<View style={item_styles.image}></View>
		<View style={item_styles.area}>
			<Text style={item_styles.title}>{props.data.retailer.name}</Text>
			<View style={item_styles.about}>
				<Text style={item_styles.number}>{props.data.number}</Text>
				<TouchableOpacity><Text style={item_styles.remove}><Icon name="close" style={{color:'red'}} size={30} /></Text></TouchableOpacity>
			</View>
		</View>
	</View>
);

const empty_styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
	},
	text: {
		fontSize: 14,
	},
});

const Empty = () => (
	<View styles={empty_styles.container}>
		<Text styles={empty_styles.text}>Добавьте карты лояльности торговых сетей, чтобы ваши покупки автоматически учитывались в акциях.</Text>
	</View>
);
