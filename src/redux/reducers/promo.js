import config	from '../../config';
import API		from '../../services/api';
import storage	from '../../services/storage';

export const ReducerRecord = () => ({
	promo_list: [],
	my_promo_list: [],
	retailer_list: [],
	promo_detail: null,
});

// Постоянные
export const module = 'promo';

export const SET_PROMO_LIST		= config.name+'/'+module+'/SET_PROMO_LIST';
export const SET_MY_PROMO_LIST	= config.name+'/'+module+'/SET_MY_PROMO_LIST';
export const ADD_MY_PROMO		= config.name+'/'+module+'/ADD_MY_PROMO';
export const SET_RETAILER_LIST	= config.name+'/'+module+'/SET_RETAILER_LIST';
export const SET_DETAIL			= config.name+'/'+module+'/SET_DETAIL';
// export const REQUEST			= config.name+'/'+module+'/REQUEST';

// Редуктор
export default function reducer(st = ReducerRecord(),action) {
	const {type,payload,error} = action;
	// console.log("ACTION",type);
	// console.log("STATE",st);

	switch(type) {
		case SET_PROMO_LIST:
			st.promo_list = payload;
			break;

		case SET_MY_PROMO_LIST:
			st.my_promo_list = payload;
			break;

		case ADD_MY_PROMO:
			let existing = st.my_promo_list.find(e => e.id==payload.id);
			if(existing) return {...st};
			else return {
				...st,
				promo_list: st.promo_list.map(promo => {
					promo.promo_list.forEach(e => {if(e.id==payload.id) e.participation=true});
					return promo;
				}),
				my_promo_list: [
					...st.my_promo_list,
					payload,
				],
			};

		case SET_RETAILER_LIST:
			st.retailer_list = payload;
			break;

		case SET_DETAIL:
			return {...st,promo_detail:payload};
	}

	return {...st};
}

// Действия
export const set_promo_list		= (payload) => ({type:SET_PROMO_LIST,payload});
export const set_my_promo_list	= (payload) => ({type:SET_MY_PROMO_LIST,payload});
export const add_my_promo		= (payload) => ({type:ADD_MY_PROMO,payload});
export const set_retailer_list	= (payload) => ({type:SET_RETAILER_LIST,payload});
export const set_detail			= (payload) => ({type:SET_DETAIL,payload});

export const request = {
	// Список акций
	get_list: async () => {
		let {response,error} = await API('/PromoGroupList');
		if(response) {
			return {response:{
				items: response.map(e => ({
					id:				e.PromoGroupID,
					title:			e.PromoGroupName,
					start:			e.Start.substring(0,10),
					end:			e.Finish.substring(0,10),
					image_url:		e.BannerLink,
					main_image_url: e.MainBannerLink,
				})),
			}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Список торговых сетей
	get_retailers: async () => {
		let {response,error} = await API('/GetNetworkList');
		if(response) {
			return {response:{
				items: response.map(e => ({
					id:					e.NetworkID,
					title:				e.Name,
					image_url:			e.LogoLink,
					has_loyalty_card:	e.HasLoyaltyCard,
				}))
			}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Список торговых сетей в акции
	get_promo_retailers: async (data) => {
		let {response,error} = await API('/PromoList',{
			UserID: data.user_id,
			PromoGroupID: data.promo_id,
		});
		if(response) {
			return {response:{
				items: response.map(e => ({
					id:					e.PromoID,
					group_id:			e.PromoGroupID,
					title:				e.Name,
					description:		e.Description,
					start:				e.Start.substring(0,10),
					end:				e.Finish.substring(0,10),
					retailer_id:		e.NetworkID,
					image_url:			e.BannerLink,
					site_link:			e.WebSiteLink,
					rules_link:			e.RulesLink,
					active:				e.IsActive,
					can_participate:	e.CanJoin,
					participation:		e.Participate,
				})).filter(e => e.active),
			}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Участие в акции
	participate: async (data) => {
		let {response,error} = await API('/JoinPromo',{
			UserID: data.user_id,
			PromoID: data.promo_id,
		});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Данные об акции
	get_details: async (data) => {
		let {response,error} = await API('/GetPromoDetails',{
			UserID: data.user_id,
			PromoID: data.promo_id,
		});
		if(response) {
			return {response:{
				prizes:			  response.PrizesCount,
				points:			  response.PointsCount,
				points_type:	  response.PointsName,
				add_check:		!!response.AddCheckAvailability,
				buy_prize:		!!response.BuyPrizesAvailability,
				show_prizes:	!!response.MyPrizesAvailability,
			}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Данные о чеках
	get_checks: async (data) => {
		let {response,error} = await API('/GetChecks',{
			UserID: data.user_id,
			PromoID: data.promo_id,
		});
		if(response) {
			return {response:{
				items: response.map(e => ({
					id:			e.CheckID,
					number:		e.CheckNum,
					date:		e.Date.substring(0,10),
					state:		e.State,
					scores:		e.Scores,
					details:	e.Details,
				})),
			}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},

	// Добавление чека
	add_check_data: async (data) => {
		let {response,error} = await API('/AddCheckData',{
			UserID:		data.user_id,
			PromoID:	data.promo_id,
			Date:		data.datetime,
			Sum:		data.sum,
			FN:			data.fn,
			FD:			data.fd,
			FP:			data.fp,
		});
		if(response) {
			return {response:{check_id:response.CheckID}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Данные о чеках
	add_check_photo: async (data) => {
		let {response,error} = await API('/UploadCheckPhoto',{
			UserID:		data.user_id,
			PromoID:	data.promo_id,
			CheckID:	data.check_id,
			File:		data.file,
		});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Выбор подарка
	choose_prize: async (data) => {
		let {response,error} = await API('/GetPrizeList',{
			UserID:  data.user_id,
			PromoID: data.promo_id,
		});
		if(response) {
			console.log(response);
			return {response:{
				available_points:	   +response.AvailablePoints.substring(0,response.AvailablePoints.indexOf(' ')),
				available_points_type:	response.AvailablePoints.substring(response.AvailablePoints.indexOf(' ')+1),
				items: response.Prizes.map(e => ({
					id:			e.PrizeID,
					name:		e.PrizeName,
					image_url:	e.ImgLink,
					cost:	   +e.Cost.substring(0,e.Cost.indexOf(' ')),
					cost_type:	e.Cost.substring(e.Cost.indexOf(' ')+1),
					remains:	e.Remains,
					available:	e.Available,
					details:	e.Details,
				})),
			}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Покупка подарка
	buy_prize: async (data) => {
		let {response,error} = await API('/BuyPrize',{
			UserID:  data.user_id,
			PromoID: data.promo_id,
			PrizeId: data.prize_id,
		});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Список подарков
	get_user_prizes: async (data) => {
		let {response,error} = await API('/GetUserPrizes',{
			UserID:  data.user_id,
			PromoID: data.promo_id,
		});
		if(response) {
			// if(!response.length) {
			// 	response = [
		    //         {
		    //            'GroupID':1,
		    //            'GroupName':'Сертификаты',
		   	// 		   'GetUserData':2,
		    //            'GetTypeID':1,
		    //            "Prizes": [
		    //               {
		    //                  'PrizeName':'Сертификат в Магнит на 1000 рублей',
		    //                  'ImgLink': 'http://api.emg.ru/PrizePhotos/1.jpg',
		    //                  'State':'Нужно ввести данные',
		    //                  'Details':'',
		    //                  'Link':''
		    //               }
		    //            ]
		    //         },
		    //         {
		    //            'GroupID':2,
		    //            'GroupName':'Коллекционные тарелки',
		    //            'GetUserData':-1,
		   	// 		   'GetTypeID':-1,
		    //            "Prizes": [
		    //               {
		    //                  'PrizeName':'Коллекционная тарелка',
		    //                  'ImgLink': 'http://api.emg.ru/PrizePhotos/2.jpg',
		    //                  'State':'Ожидает отправки',
		    //                  'Details':'Ваш приз будет доставлен по адресу ХХХ',
		    //                  'Link':''
		    //               },
		    //               {
		    //                  'PrizeName':'Коллекционная тарелка',
		    //                  'ImgLink': 'http://api.emg.ru/PrizePhotos/2.jpg',
		    //                  'State':'Отправлено. Смотреть статус',
		    //                  'Details':'Ваш приз будет доставлен по адресу ХХХ',
		   	// 	 			 'Link': 'http://pochta.ru/XXX/?tracknumber=1654454501'
		    //               }
		    //            ]
		    //         }
			// 	];
			// }
			return {response:{
				items: response.map(e => ({
					group_id:			e.GroupID,
					group_name:			e.GroupName,
					user_data_type:		e.GetUserData,
					get_type:			e.GetTypeID,
					prize_list: e.Prizes.map(g => ({
						name:		g.PrizeName,
						image_url:	g.ImgLink,
						state:		g.State,
						details:	g.Details,
						link:		g.Link,
					})),
				})),
			}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Список центров выдачи подарков
	get_prize_center_list: async (data) => {
		let {response,error} = await API('/PrizeCenterList',{
			UserID:  data.user_id,
			PromoID: data.promo_id,
		});
		if(response) {
			// if(!response.length) {
			// 	response = [
			// 		{
			// 			"ID":1,
			// 			"Name":"Лента в Южном Бутово",
			// 			"Address":"г.Москва, ул. Южнобутовская, д.123",
			// 			"GpsLat": 54.743689,
			// 			"GpsLng": 56.014002
			// 		},
			// 		{
			// 			"ID":2,
			// 			"Name":"Лента на Севастопольском",
			// 			"Address":"г.Москва, Севастопольский проспект, д.83",
			// 			"GpsLat": 54.793689,
			// 			"GpsLng": 56.114002
			// 		},
            // 	];
			// }
			return {response:{
				items: response.map(e => ({
					id:			e.ID,
					name:		e.Name,
					address:	e.Address,
					lat:		e.GpsLat,
					lng:		e.GpsLng,
				})),
			}};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Выбор центра выдачи призов
	set_prize_center: async (data) => {
		let {response,error} = await API('/SetPrizeCenter',{
			User_id:	data.user_id,
			PromoID:	data.promo_id,
			ID: 		data.center,

		});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Добавление адреса доставки приза
	set_delivery_adress: async (data) => {
		let {response,error} = await API('/​SetDeliveryAddres',{
			User_id:	data.user_id,
			PromoID:	data.promo_id,
			Region: 	data.region,
			Postcode: 	data.postcode,
			City: 		data.city,
			Street:		data.street,
			Building: 	data.building,
			Apartment: 	data.apartment,

		});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
	// Подтверждение доставки чека
	confirm_prize_details: async (data) => {
		let {response,error} = await API('/ConfirmGetPrizeDetails',{
			User_id:	data.user_id,
			PromoID:	data.promo_id,

		});
		if(response) {
			return {response:1};
		}
		if(error) {
			console.log('error',error);
			return {error};
		}
	},
};
