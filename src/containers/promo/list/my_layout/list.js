import React,{Component}	from 'react';
import {FlatList,Text,View}	from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import config		from '../../../../config';

import Wait			from '../../../../templates/wait';

import Item			from './item';
import Separator	from './separator';
import Error		from './error';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	empty: {
		alignItems: 'center',
	},
	empty_text: {
		paddingBottom: '20%',
		color: '#3d3d3d',
		fontSize: 16, fontFamily: 'GothamPro',
		textAlign: 'center',
		lineHeight: 16,
	},
});

export default class MyList extends Component {

	render_footer = () => {
		if(this.props.error) return (<Error error={this.props.error} />);
		return null;
	}

	render() {
		let {my_list,error} = this.props;

		return (
			<View style={styles.container}>
			{my_list.length ? (
				<FlatList
					data={my_list}
					renderItem={({item}) => <Item data={item} big={my_list.length==1} />}
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
				<View style={styles.empty}><Text style={styles.empty_text}>Сейчас вы не участвуете {'\n'} ни в одной акции</Text></View>
			)}
			</View>
		);
	}
}
