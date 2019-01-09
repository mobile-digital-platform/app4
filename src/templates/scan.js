import React,{Component} from 'react';
import {StyleSheet,TouchableOpacity,TextInput,Text,View,Image} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
	container: {
	},
	selected: {
		marginVertical: 10, marginHorizontal: 10,
		height: 120, width: 120,
		borderRadius: 30,
		justifyContent: 'center', alignItems: 'center',
	},
	not_selected: {
		marginVertical: 10, marginHorizontal: 10,
		height: 120, width: 120,
		backgroundColor: 'red',
		borderRadius: 30,
		justifyContent: 'center', alignItems: 'center',
	},
	photo: {
		height: 120, width: 120,
		borderRadius: 30,
	},
	photo_delete: {
		backgroundColor: 'red',
		borderRadius: 50,
		height: 50, width: 50,
		justifyContent: 'center', alignItems: 'center',
		position: 'absolute',
		left: 0, top: 0,
	},
});

export default class Check extends Component {
	constructor(props) {
		super(props);

		this.input = React.createRef();

		this.state = {
			active: !!(props.value?.length),
			value: props.value ?? '',
			error: props.error,
		};
	}

	componentDidUpdate(prevProps) {
		if(!Object.is(this.props,prevProps)) {
			this.setState(state => ({
				active: state.active || this.props.value?.length,
				value: state.value || this.props.value || '',
				error: this.props.error,
			}));
		}
	}

	set_value = (value) => {
		this.setState({value,error:false});
		if(this.props.update) this.props.update(value);
	}

	set_active = async () => {
		await this.setState({active:true});
		this.input.current.focus();

		if(this.props.keyboard_options) {
			this.props.keyboard_options.scroll.current.scrollTo({x:0,y:this.props.keyboard_options.offset,animated:true});
		}
	}
	reset_active = () => {
		if(!this.state.value.length) this.setState({active:false});
		if(this.props.send) this.props.send(this.state.value);
	}

	render() {
		let state = this.state;

		return (
			<View>
				{this.props.selected ? (
					<View style={[styles.selected]}>
						<Image
							style={styles.photo}
							source={{uri: 'https://cs7.pikabu.ru/post_img/big/2017/12/30/12/1514665429137170972.jpg'}}
						/>
						<TouchableOpacity style={styles.photo_delete}>
							<Icon name="close" style={{color: 'white'}} size={40} />
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity style={[styles.not_selected]}>
						<Icon name="camera" style={{color: 'white'}} size={90} />
					</TouchableOpacity>
				)}
			</View>
		);
	}
}
