import React from 'react';
import {Image,Modal,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Attention from '../../assets/ui/attention.png';

const styles = EStyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.7)',
	},
	modal_container: {
		alignItems: 'center',
		width: 300,
		padding: 30,
		backgroundColor: '#fff',
	},
	modal_image: {
		height: 30, width: 30,
		marginBottom: 20,
		borderRadius: 15,
		backgroundColor: '#fff',
	},
	modal_text: {
		marginBottom: 20,
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		textAlign: 'center',
		lineHeight: 18,
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 40, width: 110,
		borderRadius: 50,
	},
	button_text: {
		fontSize: 14, fontFamily: 'GothamPro-Medium',
		textAlign: 'center',
	},
	button_next: {
		width: '100%',
		backgroundColor: '$red',
	},
	button_yes: {
		backgroundColor: '$red',
	},
	button_yes_text: {
		color: '#fff',
	},
	button_no: {
		backgroundColor: '#fff',
		borderWidth: 1, borderColor: '$red',
	},
	button_no_text: {
		color: '$red',
	},
});

export default (props) => (
	<Modal
		animationType={props.animation_type ?? 'fade'}
		transparent={props.transparent ?? true}
		visible={props.visible}
	>
		<View style={styles.modal}>
			<View style={styles.modal_container}>
				<Image style={styles.modal_image} source={Attention} />
				<Text style={styles.modal_text}>{props.text}</Text>
				<View style={styles.buttons}>
				{props.on_next ? (
					<TouchableOpacity style={[styles.button,styles.button_next]} onPress={props.on_next}>
						<Text style={[styles.button_text,styles.button_yes_text]}>{props.next_text ?? 'Хорошо'}</Text>
					</TouchableOpacity>
				) : props.on_yes && props.on_no ? (
				<>
					<TouchableOpacity style={[styles.button,styles.button_yes]} onPress={props.on_yes}>
						<Text style={[styles.button_text,styles.button_yes_text]}>{props.yes_text ?? 'Да'}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.button,styles.button_no]} onPress={props.on_no}>
						<Text style={[styles.button_text,styles.button_no_text]}>{props.no_text ?? 'Нет'}</Text>
					</TouchableOpacity>
				</>
				) : null}
				</View>
			</View>
		</View>
	</Modal>
);
