import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import Scan from '../../../../templates/scan';
import MainText from '../../../../templates/main_text';

const styles = StyleSheet.create({
	container: {
		paddingVertical: 25, paddingHorizontal: 0,
		backgroundColor: '#fff',
	},
	text: {
		paddingBottom: 20, paddingHorizontal: 25,
	},
	photos: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
});

export default withNavigation(class CheckPhoto extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log("CheckPhoto", this);

		return (
			<View style={styles.container}>
				<MainText style={styles.text} text="Сфотографируйте чек так, чтобы были видны название магазина, список товаров, сумма, дата, фискальные данные (ФН, ФД, ФП), и QR-код." />
				<View style={styles.photos}>
					<Scan
						selected={true}
						change_camera={this.props.change_camera}
					/>
					<Scan
						selected={false}
						change_camera={this.props.change_camera}
					/>
				</View>
			</View>
		);
	}
});
