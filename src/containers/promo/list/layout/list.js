import React,{Component}				from 'react';
import {StyleSheet,FlatList,Text,View}	from 'react-native';

import config		from '../../../../config';

import Wait			from '../../../../templates/wait';

import Item			from './item';
import Separator	from './separator';
import Error		from './error';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		// backgroundColor: '#ddd',
	},
	empty: {
		alignItems: 'center',
		// backgroundColor: '#eee',
	},
	empty_text: {
		paddingBottom: '20%',
		color: '#555',
		fontSize: 16,
		textAlign: 'center',
	},
});

export default class List extends Component {

	key_extractor = item => ''+item.id;
	render_item = ({item}) => (<Item data={item} my={this.props.my} />)
	render_footer = () => {
		if(this.props.error)	return (<Error error={this.props.error} />);
		// if(this.props.loaded)	return (<Text>Больше ничего нет</Text>);
		if(this.props.loading)	return (<Wait/>);
		return null;
	}

	render() {
		let {data,error} = this.props;

		return (
			<View style={styles.container}>
			{this.props.my ? (
				<View style={styles.empty}><Text style={styles.empty_text}>Сейчас вы не участвуете {'\n'} ни в одной акции</Text></View>
			) : (
				<FlatList
					data={data}
					renderItem={this.render_item}
					// ListHeaderComponent={Separator}
					// ItemSeparatorComponent={Separator}
					ListFooterComponent={this.render_footer}
					extraData={this.props}
					keyExtractor={this.key_extractor}
					// onEndReached={this.props.load_next}
					// onEndReachedThreshold={0.9}
					// onRefresh={this.props.load_new}
					refreshing={this.props.loading}
				/>
			)}
			</View>
		);
	}
}
