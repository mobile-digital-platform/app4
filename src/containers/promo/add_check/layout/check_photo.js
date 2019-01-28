import React, { Component } from 'react';
import { StyleSheet, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import Scan from '../../../../templates/scan';
import MainText from '../../../../templates/main_text';
import Camera from '../../../../templates/camera';


const styles = StyleSheet.create({
	container: {
		paddingVertical: 25, paddingHorizontal: 20,
		backgroundColor: '#fff',
	},
	text: {
		paddingBottom: 10, paddingHorizontal: 5,
	},
	photos: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	error_text: {
		marginLeft: 20, marginBottom: 10,
		fontSize: 14,
		color: 'red',
	},
});

export default withNavigation(class CheckPhoto extends Component {
	constructor(props) {
		super(props);

		this.state = {
			camera_visible: false,
			photos: props.photos,
			photo_error: false,
		}
	}

	componentDidUpdate(prevProps) {
		let props = this.props.state;
		if(!Object.is(prevProps,this.props)){
			this.setState({
				photos: props.photos,
				photos_error:  props.photos_error,
			})
		}
	}
	changeCamera = (value) =>{
		this.setState({camera_visible: value});
	}
	addPhoto = (data) =>{
		data = {
			photos: [...this.state.photos, data]
		}
		//this.setState(data);
		this.props.update_data(data);
	}
	removePhoto = (data) =>{
		data = {
			photos: this.state.photos.filter((item) => item.id != data.id),
		}
		//this.setState(data);
		this.props.update_data(data);
	}

	render() {
		console.log("CheckPhoto", this);
		let state = this.state;
		return (
			<View style={styles.container}>
				<MainText style={styles.text} text="Сфотографируйте чек так, чтобы были видны название магазина, список товаров, сумма, дата, фискальные данные (ФН, ФД, ФП), и QR-код." />
				<FlatList
					data={state.photos}
					renderItem={({ item }) =>  <Scan photo={item} selected={true}  remove={this.removePhoto}/>}
					ListFooterComponent={() => <Scan selected={false} changeCamera={this.changeCamera}/>}
					keyExtractor={item => '' + item.id}
					//ListEmptyComponent={() => <Scan selected={false} changeCamera={this.changeCamera}/>}
					contentContainerStyle={styles.photos}
					//numColumns={3}
				/>
				<Camera
					visible={state.camera_visible}
					changeCamera={this.changeCamera}
					addPhoto={this.addPhoto}
				/>
				{state.photos_error ? (<Text style={styles.photos_error}>{state.photos_error}</Text>) : null}
			</View>
		);
	}
});