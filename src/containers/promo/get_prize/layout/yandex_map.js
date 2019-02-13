import React from 'react'
import {WebView} from 'react-native';

const html = (
`
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU" type="text/javascript"></script>
<script type="text/javascript">
ymaps.ready(init);
function init() {
	var my_map = new ymaps.Map('map',{
		center: [54.743689,56.014002],
		zoom: 14,
	});
	var my_point = new ymaps.Placemark(
		[54.743689,56.014002],
		// {iconContent:"XSS"},
		{preset:"islands#circleDotIcon",iconColor:'#f40000'}
	);
	my_map.geoObjects.add(my_point);
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

export default () => (<WebView source={{html}} useWebKit={true} />);
