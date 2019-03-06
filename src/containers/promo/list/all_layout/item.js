import React,{Component} from 'react';
import {Animated,Easing,Platform,Image,ImageBackground,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Svg,Polygon} from 'react-native-svg';
import {withNavigation} from 'react-navigation';

const styles = EStyleSheet.create({
	container: {
		alignItems: 'flex-start',
		margin: 10,
	},
	image: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		flexWrap: 'wrap',
		height: 120, width: '100%',
		backgroundColor: '#eee',
	},
	big_image: {
		height: 350,
	},
	area: {
		width: '100%',
		padding: 10,
		borderWidth: 1, borderTopWidth: 0, borderColor: '#ccc',
	},
	title: {
		marginHorizontal: 10,
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro-Bold',
		lineHeight: 19,
	},

	icon_area: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		marginTop: 10, marginHorizontal: 7.5,
	},
	icon_link: {
		height: 25, width: 25,
		margin: 2.5,
		borderRadius: 20,
		// shadowOpacity: 1, shadowOffset: {height:0,width:0}, shadowRadius: 0.5, shadowColor: '#111',
	    elevation: 1,
	},
	icon_icon: {
		height: 25, width: 25,
		borderRadius: 12.5,
		backgroundColor: '#eee',
	},
	icon_link_empty: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 25, width: 25,
		margin: 2.5,
		borderWidth: 1, borderColor: '#e0e0e0',
		borderRadius: 20,
		// shadowOpacity: 1, shadowOffset: {height:0,width:0}, shadowRadius: 1, shadowColor: '#111',
	    elevation: 1,
	},
	icon_link_empty_text: {
		marginRight: 1, paddingTop: Platform.select({ios:2,android:0}),
		color: '#b3b3b3',
		fontSize: 12, fontFamily: 'GothamPro',
	},

	retailer_area: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},
	retailer_block: {
		justifyContent: 'space-around',
		alignItems: 'center',
		position: 'relative',
		height: 80, width: 135,
		marginTop: 10, padding: 10,
		backgroundColor: '#eee',
	},
	retailer_block_image: {
		height: 40, width: 40,
		borderRadius: 20,
	},
	retailer_block_title: {
		color: '#3d3d3d',
		fontSize: 10, fontFamily: 'GothamPro-Medium',
	},
	retailer_block_corner: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		position: 'absolute', bottom: 0, right: 0,
		height: 10, width: 10,
		// backgroundColor: '#ddd',
	},
});

// Высота иконок: н*(40+2*7)
// Высота сетей: н*(100+10)-10

const time = 150;
const icon_in_row = 8;

export default withNavigation(class ListItem extends Component {
	constructor(props) {
		super(props);

		this.animation;
		this.value = {
			icon_opacity:		new Animated.Value(1),
			retailer_height:	new Animated.Value(0),
			retailer_opacity:	Array.from({length:this.props.data.promo_list.length},_=>new Animated.Value(0)),
		};

		this.icon_height = ((25+2*2.5)+10)*EStyleSheet.value("$scale");
		this.get_retailer_height = (n) => (Math.ceil(n/2)*(80+10))*EStyleSheet.value("$scale");

		this.state = {
			image_url: props.data.image_url ?? props.data.image_url,
			image_height: styles[(props.big ? 'big_' : '')+'image'].height,

			position: 0,
			icon_length: icon_in_row,

			icon_height: this.icon_height,
			icon_opacity: 1,

			retailer_height: this.icon_height,
			retailer_opacity: Array.from({length:this.props.data.promo_list.length},_=>0),
		};
	}

	componentDidMount() {
		Image.getSize(this.state.image_url,(width,height) => {
			if(0.8*height<this.state.image_height) this.setState({image_height:0.8*height});
		},error => {
			this.setState({image_url:'https://www.sostav.ru/images/news/2018/04/20/on5vjvly.jpg'});
		});

		this.setState({
			icon_opacity: this.value.icon_opacity.interpolate({
				inputRange: [0,1],
				outputRange: [0,1],
			}),
			retailer_height: this.value.retailer_height.interpolate({
				inputRange: [0,1],
				outputRange: [this.icon_height,this.get_retailer_height(this.props.data.promo_list.length)],
			}),
			retailer_opacity: Array.from(
				{length:this.props.data.promo_list.length},
				(v,i) => this.value.retailer_opacity[i].interpolate({
					inputRange: [0,1],
					outputRange: [0,1],
				})
			),
		});
	}

	change_position = () => {
		if(this.state.position)	this.shrink();
		else					this.expand();
	}

	expand = () => {
		Animated.timing(this.value.icon_opacity,{
			toValue: 0,
			duration: 50,
			easing: Easing.linear,
		}).start(_=>{
			this.setState(state => ({position:1}));

			this.animation = Animated.timing(this.value.retailer_height,{
				toValue: 1,
				duration: time*Math.ceil(this.props.data.promo_list.length/2),
				easing: Easing.linear,
			}).start();

			this.value.retailer_opacity.forEach((v,i) => {
				setTimeout(_=>Animated.timing(v,{
					toValue: 1,
					duration: time,
					easing: Easing.linear,
				}).start(),Math.max(0,time*(i-0.5)));
			});
		});
	}
	shrink = () => {
		this.value.retailer_opacity.forEach((v,i) => {
			setTimeout(_=>{
				Animated.timing(v,{
					toValue: 0,
					duration: time,
					easing: Easing.linear,
				}).start();
			},Math.max(0,time*(this.value.retailer_opacity.length-1.5-i)));
		});

		this.animation = Animated.timing(this.value.retailer_height,{
			toValue: 0,
			duration: time*Math.ceil(this.props.data.promo_list.length/2),
			easing: Easing.linear,
		}).start(_=>{
			this.setState(state => ({position:0}));
			Animated.timing(this.value.icon_opacity,{
				toValue: 1,
				duration: time,
				easing: Easing.linear,
			}).start();
		});
	}

	render() {
		let {props,state} = this;

		let retailer_icon_list = props.data.promo_list.slice(0,state.icon_length);

		let triangle_size = 10*EStyleSheet.value("$scale");

		console.log(props.data.promo_list);

		return (
			<TouchableOpacity style={styles.container} onPress={_=>this.change_position()}>
				<Image style={[styles.image,{height:this.state.image_height}]} source={{uri:this.state.image_url}} />
				<View style={styles.area}>
					<Text style={styles.title}>{props.data.title?.toUpperCase()}</Text>
					{state.position == 0 ? (
						<Animated.View style={[styles.icon_area,{opacity:state.icon_opacity}]}>
						{retailer_icon_list.map((e,i) => (
							<View key={i} style={styles.icon_link}>
								<Image style={styles.icon_icon} source={{uri:e.retailer.image_url}} />
							</View>
						))}
						{props.data.promo_list.length > state.icon_length ? (
							<View style={styles.icon_link_empty}>
								<Text style={styles.icon_link_empty_text}>+{props.data.promo_list.length-state.icon_length}</Text>
							</View>
						) : null}
						</Animated.View>
					) : state.position == 1 ? (
						<Animated.View style={[styles.retailer_area,{height:state.retailer_height}]}>
						{props.data.promo_list.map((e,i) => (
							<TouchableOpacity key={i} onPress={_=>props.navigation.push('promo_details',{id:e.id})}>
							<Animated.View style={[styles.retailer_block,{opacity:state.retailer_opacity[i]}]}>
								<Image style={styles.retailer_block_image} source={{uri:e.retailer.image_url}} />
								<Text style={styles.retailer_block_title}>{e.retailer.title.toUpperCase()}</Text>
								<View style={styles.retailer_block_corner}>
									<Svg height={triangle_size} width={triangle_size}>
										<Polygon
											points={'0,'+triangle_size+' '+triangle_size+',0 '+triangle_size+','+triangle_size}
											fill={EStyleSheet.value("$red")}
										/>
									</Svg>
								</View>
							</Animated.View>
							</TouchableOpacity>
						))}
						</Animated.View>
					) : null}
				</View>
			</TouchableOpacity>
		);
	}
});
