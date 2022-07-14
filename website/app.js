/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5ac6d690d9859a69fabbd87d5072f7d0&units=metric';

const zipCodeELement = document.getElementById('zip');
const feelElement  = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  (d.getMonth()+1)+'/'+d.getDate()+'/'+ d.getFullYear();

//adding event listener on clicking button
document.getElementById('generate').addEventListener('click',performAction);
function performAction (e){
	//input values
	const newCode = zipCodeELement.value;
	const content = feelElement.value;

	if(newCode ==''){
		alert("please adds a zipcode");
	}

	getWeather(baseUrl, newCode, apiKey)
	.then(data =>{
		//adding data to post request
		postData('/addData', { date: newDate, temp: data.main.temp, content })
	}).then(()=>{
		//call updateUI function to upaate content
		updateUi();
	})
}
//get data from api
const getWeather = async (url, zipCode, key) => {
	const res = await fetch(url+zipCode+key);
	try{
		const data = await res.json();
		console.log(data);
		return data ;
	} catch(error){
		console.log('error', error) ;
	}
};

//POST data
const postData = async (url = '', data = {}) => {
	const response = await fetch (url, {
		method: "POST",
		credentials:"same-origin",
		headers:{"content-type":"application/json"},
		body:JSON.stringify({
			date: data.date,
			temp: data.temp,
			content: data.content
		})
	})
	try{
		const newData = await response.json();
		return newData ;
	} catch(error){
		console.log('error',error);
	}
};
// updateUi function that update content in browser
const updateUi = async () => {
	const request = await fetch('/all');
	try{
		const allData = await request.json();
		console.log(allData);
		document.getElementById('date').innerHTML = `date is : ${allData.date}`;
		document.getElementById('temp').innerHTML = `temperature is : ${Math.round(allData.temp)}`;
		document.getElementById('content').innerHTML = allData.content;

	}catch(error){
		console.log('error',error);
	}

};
