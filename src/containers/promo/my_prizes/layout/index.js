import React from 'react';
import {FlatList,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Section from './section';

const styles = EStyleSheet.create({
	container:{
		flex: 1,
		paddingHorizontal: 10,
		backgroundColor: '#fff',
	},
});

export default (props) => (
	<FlatList
		style={styles.container}
		data={props.list}
		renderItem={({item}) => <Section data={item} />}
		// ListHeaderComponent={Separator}
		// ItemSeparatorComponent={Separator}
		// ListFooterComponent={this.render_footer}
		// extraData={this.props}
		keyExtractor={item => item.group_id+''}
		// onEndReached={this.props.load_next}
		// onEndReachedThreshold={0}
		onRefresh={props.reload}
		refreshing={props.loading}
	/>
);

/*
export default withNavigation((props) => (
	<ScrollView>
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
	</ScrollView>
));
*/
