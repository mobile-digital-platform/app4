import React,{Component} from 'react';
import { StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image,Modal,Alert} from 'react-native';
import {withNavigation} from 'react-navigation';

import MainText		from '../../../../templates/main_text';
import SubTitle		from '../../../../templates/subtitle';
import Prize		from '../../../../templates/prize';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingVertical: 25, paddingHorizontal: 10,
	},
	score_info:{
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 30,
	},
	score_text:{
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 18,
		color: '#3D3D3D',
	},
	score_number:{
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
	}

	state = {
		modalVisible: true,
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}
	render() {

		return (
			<View style={styles.container}>
				<View style={styles.score_info}>
					<Text style={styles.score_text}>Твои баллы:</Text>
					<Text style={styles.score_number}>50</Text>
				</View>
				<FlatList
					data={[
						{
							title: 'Название приза, может быть длинным'
						},
						{
							title: 'two'
						},
						{
							title: 'three'
						},
						{
							title: 'four'
						},
						{
							title: 'five'
						},
					]}
					renderItem={({ item }) => <Prize title={item.title} />}
					// ListHeaderComponent={Separator}
					// ItemSeparatorComponent={Separator}
					// ListFooterComponent={this.render_footer}
					// extraData={this.props}
					// keyExtractor={item => item.id+''}
					// onEndReached={this.props.load_next}
					// onEndReachedThreshold={0}
					// onRefresh={this.props.load_new}
					// refreshing={this.props.loading}
				/>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}>
					<View style={styles.modal}>
						<View style={styles.modal_container}>
							<Image
								style={styles.modal_image}
								source={{ uri: '' }}
							/>
							<MainText style={styles.modal_text} text="Ты выбрал «фигню из двух разделочных досок». Подтвержаешь свой выбор?" />
							<View style={styles.buttons}>
								<TouchableOpacity style={styles.button_ok}>
									<Text style={styles.button_ok_text}>Да</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button_no}>
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