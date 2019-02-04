import React,{Component} from 'react';
import {StyleSheet,FlatList,ImageBackground,ScrollView,Text,TouchableOpacity,View,Image,SectionList} from 'react-native';
import {withNavigation} from 'react-navigation';

import {MyPrize as Prize,Empty} 	from '../../../templates/prize';
import SubTitle						from '../../../templates/subtitle';

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#fff',
		paddingVertical: 25, paddingHorizontal: 10,
	},
	title: {
		paddingLeft: 15,
		paddingBottom: 20,
	},
});

export default withNavigation(class ChoosePrize extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false,
			balance: 13,
			data: [
				{
					id: 1,
					title: 'Сет из разделочных досок',
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
					score_num: 17,
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
			selectedPrize: null,
		};
	}

	componentDidUpdate(prevProps) {
		if (!Object.is(prevProps, this.props)) {
			this.setState({
				balance: props.balance,
				data: props.prizes,
			})
		}
	}
	render() {
		let state = this.state;
		return (
			<SectionList
				contentContainerStyle={styles.container}
				renderItem={({ item, index, section }) => <Prize data={item} />}
				renderSectionHeader={({ section: { title } }) => (
					<SubTitle style={styles.title} text="title" />
				)}
				sections={[
					{ title: 'Title1', data: ['item1', 'item2'] },
					{ title: 'Title2', data: ['item3', 'item4'] },
					{ title: 'Title3', data: ['item5', 'item6'] },
				]}
				keyExtractor={(item, index) => item + index}
			/>
		);
	}
});
