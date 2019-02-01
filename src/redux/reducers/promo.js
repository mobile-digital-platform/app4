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
					id:			e.PromoGroupID,
					title:		e.PromoGroupName,
					start:		e.Start.substr(0,10),
					end:		e.Finish.substr(0,10),
					image_url:	e.BannerLink,
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
					title:				e.PromoGroupName,
					description:		e.Description,
					start:				e.Start.substr(0,10),
					end:				e.Finish.substr(0,10),
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
			let points = response.PointsCount?.substr(0,response.PointsCount.indexOf(' ')),
				points_type = response.PointsCount?.substr(response.PointsCount.indexOf(' ')+1);
			return {response:{
				prizes:			  response.PrizesCount,
				points,
				points_type,
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
					date:		e.Date.substr(0,10),
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
};
