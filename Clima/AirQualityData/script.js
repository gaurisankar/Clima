const errorLabel = document.querySelector("label[for='error-msg']")
const latInp = document.querySelector("#latitude")
const lonInp = document.querySelector("#longitude")
const airQuality = document.querySelector(".air-quality")
const airQualityStat = document.querySelector(".air-quality-status")
const srchBtn = document.querySelector(".search-btn")
const componentsEle = document.querySelectorAll(".component-val")

const appId = "c56eaad0e2a80df29d68e881eae731ba" // Get your own API Key from https://home.openweathermap.org/api_keys
const link = "https://api.openweathermap.org/data/2.5/air_pollution"	// API end point

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>Browser has no support for geolocation services</p>";
}

//userpositionset
 function setPosition(position){
     let latitude = position.coords.latitude;
     let longitude = position.coords.longitude;

     getAirQuality(latitude,longitude);
 }

 //Error
 function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p> ${error.message} </p>`;

 }

const getAirQuality = async (lat, lon) => {
	const rawData = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${appId}`).catch(err => {
		onPositionGatherError({ message: "Something went wrong. Check your internet conection." })
		console.log(err)
	})
	const airData = await rawData.json()
	setValuesOfAir(airData)
	setComponentsOfAir(airData)
}

const setValuesOfAir = airData => {
	console.log(airData)
	const aqi = airData.list[0].main.aqi
	let airStat = "", color = ""
    
	airQuality.innerText = aqi


	switch (aqi) {
		case 1:
			airStat = "Good"
			color = "rgb(19, 201, 28)"
			break
			case 2:
				airStat = "Fair"
				color = "rgb(15, 134, 25)"
				break
			case 3:
				airStat = "Moderate"
				color = "rgb(201, 204, 13)"
				break
			case 4:
				airStat = "Poor"
				color = "rgb(204, 83, 13)"
				break
		case 5:
			airStat = "Very Poor"
			color = "rgb(204, 13, 13)"
			break
		default:
			airStat = "Unknown"
	}

	airQualityStat.innerText = airStat
	airQualityStat.style.color = color
}
var arrObject = new Array();

const setComponentsOfAir = airData => {
	let components = {...airData.list[0].components}
	componentsEle.forEach(ele => {
		const attr = ele.getAttribute('data-comp')
		const raw = components[attr]
		ele.innerText = components[attr] += " μg/m³"
      		
	   const a = [raw];
       a.forEach((entry,n) => {
		     arrObject[n]=entry
              console.log(arrObject)
});

	})
}

const onPositionGatherError = e => {
	errorLabel.innerText = e.message
}

