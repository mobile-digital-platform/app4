import React,{Component} from 'react';
import {Animated,Easing,ActivityIndicator,FlatList,Image,ImageBackground,ScrollView,Text,TouchableOpacity,View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {withNavigation} from 'react-navigation';

import f from '../../../../functions';

import QuestionIcon		from '../../../../../assets/ui/question_icon.png';

import promo_date_diff	from '../../../../services/promo_date_diff';

import Check			from './check';
import Separator		from './separator';

const styles = EStyleSheet.create({
	container: {
		flex: 1,
	},
	banner: {
		justifyContent: 'flex-end',
		height: 120,
		padding: 20,
		backgroundColor: '#000',
	},
	points_area: {
		alignItems: 'flex-end',
		position: 'absolute', top: '-100%', right: 10,
	},
	points: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 45, width: 50,
		backgroundColor: '#b30000',
	},
	points_number: {
		paddingBottom: 3,
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro-Bold',
	},
	points_type: {
		color: '#fff',
		fontSize: 9, fontFamily: 'GothamPro',
	},
	title: {
		color: '#fff',
		fontSize: 18, fontFamily: 'GothamPro-Bold',
		textShadowRadius: 5, textShadowColor: '#111',
		lineHeight: 21,
	},
	ending: {
		color: '#fff',
		fontSize: 12, fontFamily: 'GothamPro',
		textShadowRadius: 5, textShadowColor: '#111',
	},
	retailer_area: {
		alignItems: 'flex-end',
		width: '100%',
		marginTop: -30, marginBottom: -10,
		paddingRight: 10,
		zIndex: 1,
	},
	retailer_image: {
		height: 40, width: 40,
		borderRadius: 20,
		backgroundColor: '#eee',
	},

	main_area: {
		flex: 1,
		justifyContent: 'center',
	},

	list: {
	},
	list_padding: {
		height: 10,
	},

	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	empty_text: {
		paddingBottom: '10%',
		color: '#555',
		fontSize: 14,
		textAlign: 'center',
		lineHeight: 16,
	},

	bottom: {
		alignItems: 'center',
		marginTop: 0,
		paddingVertical: 10, paddingHorizontal: 40,
		borderTopWidth: 1, borderTopColor: '#ccc',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 40, width: '100%',
		marginVertical: 5,
		borderRadius: 100,
	},
	button_text: {
		fontSize: 14, fontFamily: 'GothamPro-Medium',
	},
	add_button: {
		backgroundColor: '$red',
	},
	add_button_text: {
		color: '#fff',
	},
	get_button: {
		borderWidth: 1, borderColor: '$red',
		backgroundColor: '#fff',
	},
	get_button_text: {
		color: '$red',
	},
	question: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 40,
	},
	question_icon: {
		height: 13, width: 14,
		marginRight: 8,
	},
	question_text: {
		color: '#3d3d3d',
		fontSize: 14, fontFamily: 'GothamPro',
		lineHeight: 16,
	},
});

export default withNavigation(class MyPromoListLayout extends Component {
	animation = {
		points_top: new Animated.Value(0),
		bottom_top: new Animated.Value(0),
	};
	state = {
		points_top: '-100%',
		bottom_top: 0,
	};

	componentDidMount() {
		this.setState({
			points_top: this.animation.points_top.interpolate({
				inputRange: [0,1],
				outputRange: ['-100%','0%'],
			}),
			// bottom_top: this.animation.bottom_top.interpolate({
			// 	inputRange: [0,1],
			// 	outputRange: [500,0],
			// }),
		});
	}
	componentDidUpdate(prev_props) {
		// Получили данные по очкам
		if(!prev_props.details.points && this.props.details.points) {
			setTimeout(_=> {
				Animated.timing(this.animation.points_top,{
					toValue: 1,
					duration: 500,
					easing: Easing.bezier(0.5,0,0.2,1),
				}).start();
			},1000);
		}
		// Получили данные по участию
		/*
		if(
			!(prev_props.details.add_check && prev_props.details.buy_prize) &&
			  this.props.details.add_check && this.props.details.buy_prize
		) {
			setTimeout(async _=> {
				Animated.timing(this.animation.bottom_top,{
					toValue: 1,
					duration: 500,
					easing: Easing.bezier(0.3,0,0.7,1),
				}).start();
			},300);
		}
		*/
	}

	render() {
		let {props,state} = this;
		let {data,details,check} = props;

		data = promo_date_diff(data);

		console.log(details);

		return (
			<View style={styles.container}>
				<ImageBackground style={styles.banner} imageStyle={{opacity:0.5}} source={{uri:data.image_url}}>
					{details.prizes>0 || details.points>0 ? (
					<Animated.View style={[styles.points_area,{top:state.points_top}]}>
						<View style={styles.points}>
						{details.prizes>0 ? (
							<>
								<Text style={styles.points_number}>{details.prizes}</Text>
								<Text style={styles.points_type}>приз{f.number_case(details.prizes,1)}</Text>
							</>
						) : (
							<>
								<Text style={styles.points_number}>{details.points}</Text>
								<Text style={styles.points_type}>{details.points_type}</Text>
							</>
						)}
						</View>
					</Animated.View>
					) : null}
					<Text style={styles.title}>{data.title.toUpperCase()}</Text>
					<Text style={styles.ending}>{data.diff_text}</Text>
				</ImageBackground>
				<View style={styles.retailer_area}>
					<Image style={styles.retailer_image} source={{uri:data.retailer.image_url}} />
				</View>
				<View style={styles.main_area}>
				{props.check_error ? (
					<View style={styles.empty}><Text style={styles.empty_text}>{props.check_error}</Text></View>
				) : (
					check.length ? (
						<FlatList
							style={styles.list}
							data={check}
							renderItem={({item}) => (<Check data={item} extra={details} />)}
							ListHeaderComponent={<View style={styles.list_padding} />}
							ListFooterComponent={<View style={styles.list_padding} />}
							// ItemSeparatorComponent={Separator}
							keyExtractor={item => ''+item.id}
							onRefresh={props.get_data}
							refreshing={props.loading}
						/>
					) : (
						props.loading ? (
							<ActivityIndicator size='large' />
						) : (
							<View style={styles.empty}><Text style={styles.empty_text}>
								Пока у вас нет ни одной покупки по акции.{'\n\n'}
								{data.retailer.has_loyalty_card ? (
									details.add_check ? (
										'Вы можете вручную добавить кассовый чек, нажав кнопку «Добавить чек»'
									) : (
										'Зарегистрируйте карту лояльности магазина в настройках, и используйте ее при покупке.\n'+
										'Данные по покупкам добавятся автоматически.'
									)
								) : null}
							</Text></View>
						)
					)
				)}
				</View>
				{details.add_check && details.buy_prize ? (
				<Animated.View style={[styles.bottom,{marginTop:state.bottom_top}]}>
					{details.add_check ? (
						<TouchableOpacity style={[styles.button,styles.add_button]} onPress={_ => {
							props.navigation.push('promo_add_check',{id:data.id});
							props.navigation.addListener('didFocus',props.get_data);
						}}>
							<Text style={[styles.button_text,styles.add_button_text]}>Добавить чек</Text>
						</TouchableOpacity>
					) : null}
					{details.show_prizes ? (
						<TouchableOpacity style={[styles.button,styles.get_button]} onPress={_=>props.navigation.push('promo_my_prizes',{id:data.id})}>
							<Text style={[styles.button_text,styles.get_button_text]}>Посмотреть призы</Text>
						</TouchableOpacity>
					) : details.buy_prize ? (
						<TouchableOpacity style={[styles.button,styles.get_button]} onPress={_=>props.navigation.push('promo_choose_prize',{id:data.id})}>
							<Text style={[styles.button_text,styles.get_button_text]}>Получить выигрыш</Text>
						</TouchableOpacity>
					) : null}
					<TouchableOpacity style={styles.question} onPress={_=>props.navigation.push('help',{promo_id:data.id})}>
						<Image style={styles.question_icon} source={QuestionIcon} />
						<Text style={styles.question_text}>Задать вопрос</Text>
					</TouchableOpacity>
				</Animated.View>
				) : null}
			</View>
		);
	}
});
