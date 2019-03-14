import React,{Component} from 'react';
import {FlatList,Text,TouchableOpacity,View,Image,Modal,Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Dialog from '../../../../templates/dialog';

import Item from './item';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	balance: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
	},
	balance_text: {
		flexDirection: 'row',
		alignItems: 'center',
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
	},
	balance_num: {
		fontFamily: 'GothamPro-Bold',
	},
	list: {
		flex: 1,
		marginTop: -10,
	},
	bottom: {
		alignItems: 'center',
		marginTop: 0,
		paddingVertical: 10, paddingHorizontal: 40,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 40, width: '100%',
		marginVertical: 5,
		borderRadius: 100,
		backgroundColor: '$red',
	},
	button_text: {
		color: '#fff',
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},

	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	empty_text: {
		paddingBottom: '20%',
		color: '#3d3d3d',
		fontSize: 12, fontFamily: 'GothamPro',
		textAlign: 'center',
		lineHeight: 16,
	},
});

export default class ChoosePrize extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal_visible: false,
			selected: -1,
		};
	}

	open  = () => this.setState({modal_visible:true});
	close = () => this.setState({modal_visible:false});

	select   = (i) => this.setState({modal_visible:true, selected: i});
	deselect = ()  => this.setState({modal_visible:false,selected:-1});

	buy = () => {
		this.close();
		this.props.buy_prize(this.props.list[this.state.selected]);
	}

	render() {
		let {props,state} = this;

		return (
			<View style={styles.container}>
			{props.loading || props.list.length ? (
			<>
				<View style={styles.balance}>
				{props.available_points_type.length ? (
					<Text style={styles.balance_text}>
						Ваши баллы: <Text style={styles.balance_num}>{props.available_points+' '+props.available_points_type}</Text>
					</Text>
				) : null}
				</View>
				<FlatList
					style={styles.list}
					data={props.list}
					renderItem={({item,index}) => <Item {...item} available_points={props.available_points} select={_=>this.select(index)} />}
					keyExtractor={item => item.id+''}
					onRefresh={props.reload}
					refreshing={props.loading}
				/>
				<View style={styles.bottom}>
					<TouchableOpacity style={styles.button} onPress={_=>props.navigation.push('promo_my_prizes',{id:props.promo_id})}>
						<Text style={styles.button_text}>Мои призы</Text>
					</TouchableOpacity>
				</View>
				<Dialog
					visible={state.modal_visible}
					text={(state.selected>=0 ? 'Вы выбрали «'+props.list[state.selected].name+'». ' : '')+'Подтвержаете свой выбор?'}
					on_yes={this.buy}
					on_no={this.deselect}
				/>
			</>
			) : (
				<View style={styles.empty}><Text style={styles.empty_text}>Пока у вас нет призов</Text></View>
			)}
			</View>
		);
	}
}
