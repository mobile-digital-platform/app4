import {request} from '../redux/reducers/promo';

export default async ({user_id,retailer_list}) => {
	let data = await request.get_list({user_id});
	if(data.response) {
		let items = data.response.items;
		let waiting = [];
		let result = true;

		for(let i=0; i<items.length; i++) {
			let row = items[i];

			// Набираем по всем акциям уточнения внутри торговых сетей
			waiting.push(new Promise(async (resolve,reject) => {
				let retailers_data = await request.get_promo_retailers({promo_id:row.id,user_id});
				if(retailers_data.response) {
					items[i].promo_list = retailers_data.response.items.map(e =>({
						...e,
						retailer: retailer_list.find(g => g.id==e.retailer_id),
					}));
				}
				if(retailers_data.error) result = false;
				resolve();
			}));
		}
		await Promise.all(waiting);

		let my_items = [];
		for(let i=0; i<items.length; i++) {
			let row = items[i];
			if(row.promo_list) for(let j=0; j<row.promo_list.length; j++) {
				let nrow = row.promo_list[j];
				if(nrow.participation) {
					nrow.image_url = row.image_url;
					my_items.push(nrow);
				}
			}
		}

		return {items,my_items};
	}
	if(data.error) {
		return false;
	}
}
