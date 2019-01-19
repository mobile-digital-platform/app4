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
		fontSize: 16, fontFamily: 'GothamPro',
		textAlign: 'center',
	},
});

export default class List extends Component {

	render_footer = () => {
		if(this.props.error) return (<Error error={this.props.error} />);
		return null;
	}

	render() {
		let {list,error} = this.props;

		return (
			<View style={styles.container}>
			{list.length ? (
				<FlatList
					data={list}
					renderItem={({item}) => <Item data={item} big={list.length==1} />}
					// ListHeaderComponent={Separator}
					// ItemSeparatorComponent={Separator}
					ListFooterComponent={this.render_footer}
					extraData={this.props}
					keyExtractor={item => item.id+''}
					// onEndReached={this.props.load_next}
					// onEndReachedThreshold={0}
					onRefresh={this.props.reload}
					refreshing={this.props.state.loading}
				/>
			) : (
				<View style={styles.empty}><Text style={styles.empty_text}>Сейчас не проводится {'\n'} ни в одной акции</Text></View>
			)}
			</View>
		);
	}
}
