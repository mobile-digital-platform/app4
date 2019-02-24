import React from 'react'
import {WebView} from 'react-native';

import config from '../../../../config';

export default ({list}) => {
	let html = (
`
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1.0" />
<script src="http://api-maps.yandex.ru/2.1/?apikey=`+config.yandex_maps_api_key+`&load=package.full&lang=ru-RU" type="text/javascript"></script>
<script type="text/javascript">
ymaps.ready(init);
async function init() {
	var my_map = new ymaps.Map('map',{
		center: [54.743689,56.014002],
		zoom: 14,
		controls: ['geolocationControl','zoomControl'],
	});
	var res = await ymaps.geolocation.get({
		provider: 'yandex',
		mapStateAutoApply: true,
	});
	var points = [
		res.geoObjects,
		`+list.map(e => (
			`new ymaps.Placemark(
				[`+e.lat+`,`+e.lng+`],
				{iconContent:"XSS"},
				{preset:"islands#circleDotIcon",iconColor:'#f40000'},
			)`
		)).join(',')+`
	];
	points.forEach(point => my_map.geoObjects.add(point));
	// my_map.setBounds(my_map.geoObjects.getBounds());
	// document.getElementById('map').innerHTML = window.innerWidth;
}
</script>
<style type="text/css">
body {
	margin: 0;
}
#map {
	height: 100%; width: 100%;
	overflow: hidden;
}
</style>
<body>
<div id="map"></div>
</body>
</html>
`
	);

	return (<WebView source={{html}} scrollEnabled={false} useWebKit={true} />);
}
