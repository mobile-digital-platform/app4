import API from '../../services/api';

// Задать вопрос
export default async function(data) {
	let {response,error} = await API('/AskQuestion',{
		UserID:		data.user_id,
		PromoID:	data.promo_id,
		From:		data.from,
		Title:		data.question,
		Body:		data.text,
		Email:		data.mail,
	});
	if(response) {
		return {response:1};
	}
	if(error) {
		console.log('error',error);
		return {error};
	}
}
