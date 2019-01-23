import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import Camera from '../../../../templates/camera';
import QR_scanner from '../../../../templates/qr_scanner';

import CheckPhoto from './check_photo';
import CheckData from './check_data';

const styles = StyleSheet.create({
	container: {
	},
});

export default withNavigation(class AddCheck extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log("AddCheck index", this);

		return (
			<ScrollView style={styles.container}>
				{/* <CheckPhoto {...this.props}/> */}
				<CheckData {...this.props}/>
				{/* <Camera
					visible={this.props.camera_visible}
					change_camera={this.props.change_camera}
				/>
				<QR_scanner
					visible={this.props.qr_visible}
					change_qr={this.props.change_qr}
				 /> */}
			</ScrollView>
		);
	}
});
