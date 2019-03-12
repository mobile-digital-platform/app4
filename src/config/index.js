export default {
	name: 'mobile-digital-platform',
	version: '1.0.0',
	year: '2019',

	fcm_id: '330059855909',

	yandex_maps_api_key: '58fdb353-b0dc-4770-b94b-4945b4760d33',

	youtube_api_key: {
		ios:		'AIzaSyA6kaE3v_7UNvdBlO85Z3GR7NWgNJOaZSE',
		android:	'AIzaSyC6oK9n5OgBj5L3or64JGqPXHWdOIcgM8E',
	},

	dadata_token: '5d446e7f158e0c8b8de537cdf70d437d3198429b',

	storage_name: 'coca-cola',

	base_width: 320,

	simulator: 1,

	navigator_ref: null,

	city: {
		limit: 30,
	},
	image: {
		width: 1080,
	},
	qr_scanner: {
		tint: {
			base: 'Поднесите камеру к штрих-коду',
			tired: 'Попробуйте под другим углом',
		},
		error: 'Увы, данный QR-код не подходит\nПоищите на чеке другой',
	},
	camera: {
		capture_text: 'Сделать снимок',
	},
};
