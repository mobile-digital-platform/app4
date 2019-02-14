import React,{Component} from 'react';
import { StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image,Modal,Alert} from 'react-native';
import {withNavigation} from 'react-navigation';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingVertical: 25, paddingHorizontal: 10,
	},
	balance:{
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 30,
	},
	balance_text:{
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 18,
		color: '#3D3D3D',
	},
	balance_num:{
		fontWeight: 'bold',
		marginLeft: 5,
		fontSize: 18,
		color: '#3D3D3D',
	},
	modal:{
		backgroundColor: 'rgba(0,0,0,0.7)',
		position: 'absolute',
		left: 0, right: 0, top: 0, bottom: 0,
		alignItems: 'center',
	},
	modal_container:{
		backgroundColor: 'white',
		paddingVertical: 25, paddingHorizontal: 40,
		alignItems: 'center',
		width: '90%', 
		top: '15%',
	},
	modal_image:{
		borderRadius: 50,
		borderWidth: 1, borderColor: '#bbb',
		width: 80, height: 80,
		backgroundColor: '#fff',
		marginBottom: 20
	},
	modal_text:{
        width: 300,
	},
	buttons: {
		flexDirection: 'row',
		alignItems: 'center', justifyContent: 'space-between',
		marginVertical: 20,
		width: 280,
	},
	button_ok:{
		padding: 10,
		borderRadius: 50,
		backgroundColor: 'red',
		width: '45%',
	},
	button_ok_text:{
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
	},
	button_no:{
		padding: 10,
		borderRadius: 50,
		backgroundColor: 'white',
		width: '45%',
		borderWidth: 1, borderColor: 'red',
	},
	button_no_text:{
		color: 'red',
		fontSize: 18,
		textAlign: 'center',
	},
});

export default withNavigation(class ChoosePrize extends Component {
	constructor(props) {
		super(props);

		this.state = {
			balance: 13,
			data: [
				{
					id: 1,
					title: 'Сет из разделочных досок специально для вас',
					img: 'empty',
					score_num: 5,
					quantity: 10,
				},
				{
					id: 2,
					title: 'Сет из разделочных досок',
					img: 'empty',
					score_num: 22,
					quantity: 0,
				},
				{
					id: 3,
					title: 'Сет из разделочных досок',
					img: 'empty',
					score_num: 1,
					quantity: 102,
				},
				{
					id: 4,
					title: 'Сет из разделочных досок',
					img: 'empty',
					score_num: 17,
					quantity: 0,
				},
			],
			modalVisible: false,
			selected: null,
		};
	}

	componentDidUpdate(prevProps) {
		if(!Object.is(prevProps,this.props)){
			this.setState({
				balance: props.balance,
				data: props.prizes,
			})
		}
	}
	changeModal = (value) =>{
		this.setState({modalVisible: value});
	}
	choosePrize = (data) =>{
		this.setState({modalVisible:true, selected:data});
	}
	render() {
		let state = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.balance}>
					<Text style={styles.balance_text}>Твои баллы:</Text>
					<Text style={styles.balance_num}>{state.balance}</Text>
				</View>
				<FlatList
					data={state.data}
					keyExtractor={item => '' + item.id}
					renderItem={({ item }) => <Prize data={item} balance={state.balance} choosePrize={this.choosePrize} />}
					//ListEmptyComponent={() => <Empty />}
				/>
				<Modal
					animationType="slide"
					transparent={true}
					visible={state.modalVisible}
					onRequestClose={_=>this.changeModal(false)}>
					<View style={styles.modal}>
						<View style={styles.modal_container}>
							<Image
								style={styles.modal_image}
								source={{uri: state.selected?.img}}
							/>
							<MainText style={styles.modal_text} text={`Ты выбрал «${state.selected?.title}». Подтвержаешь свой выбор?`} />
							<View style={styles.buttons}>
								<TouchableOpacity style={styles.button_ok} onPress={_=>this.props.navigation.push('promo_my_prize',state.selected)}>
									<Text style={styles.button_ok_text}>Да</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button_no} onPress={_=>this.changeModal(false)}>
									<Text style={styles.button_no_text}>Нет</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
});