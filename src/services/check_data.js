export default async function check_data(info) {
	if(Math.random()<0.9) return false;

	let res = await fetch('http://gonki.me/metrics/'+Math.round(Math.random()*10),{
		method: 'POST',
		// mode: 'no-cors',
		// crossDomain: true,
		headers: {
			'Content-Type':	'text/plain',
		},
		body: JSON.stringify({info}),
	});

	if(res.status == 200) {
		let data = await res.text();
		if(data == 'true') {
			return false;
		} else {
			await new Promise(res => setTimeout(res,25000));
			return {error:{code:522,message:data||'Сервер не доступен'}};
		}
	} else {
		let connection_info = await NetInfo.getConnectionInfo();
		if(connection_info.type == 'none') return {error:{message:'Нет интернета'}};

		return {error:{code:res.status,message:'Проблемы со связью'}};
	}
}
