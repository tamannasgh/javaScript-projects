let apikey;
fetchapikey()
function get(){ 
	const encodedParams = new URLSearchParams();
	encodedParams.append("source", "en");
	encodedParams.append("target", document.getElementById("language").value);
	encodedParams.append("q", document.getElementById("intra").value);

	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'Accept-Encoding': 'application/gzip',
			'X-RapidAPI-Key': apikey,
			'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
		},
		body: encodedParams
	};
	// let responsejson;
	fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options).then(response => response.json()).then(response => document.getElementById("output").innerHTML = response["data"]["translations"][0]["translatedText"]).catch(err => console.error(err));
	
	// document.getElementById("output").innerHTML = responsejson
	// document.getElementById("output").innerHTML = response["data"]["translations"][0]["translatedText"]
}

function fetchapikey(){
	fetch('./key.json').then(response => response.json()).then(response => apikey = response["data"]["apikeyTranslate"]).catch(error => console.log(error));
}