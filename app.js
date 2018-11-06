var expess = require('express');
var app = express();
const request = require("request");
const fs = require("fs");

app.set('port', (process, env.PORT || 3000)); //gets a port to run our app

let name = "KN4EZY-1"
let apiKey = "117986.5w5ElPStqtCEEfG"
let url = `https://api.aprs.fi/api/get?name=${name}&what=loc&apikey=${apiKey}&format=json`;

const REQUESTRATE = 60 * 1000;  //How often to request APRS data in ms

let dataObj = {
	    table: []
}

console.log(`Pulling location data for ${name} every ${REQUESTRATE / 1000} seconds.\n`);

RequestData();
setInterval(RequestData, REQUESTRATE);

function RequestData(){
	    console.log(`Getting APRS data for ${name}...`)
	    request(url, (error, response, body) =>{
		            if(error){
				                console.log("Could not pull data, retrying...");
				                RequestData();
				            }
		            console.log("Writing location data to file");
		            WriteData(body);
		        })
}

function WriteData(data){
	    dataObj.table.push(data);
	    let json = JSON.stringify(dataObj);
	    fs.writeFile('locationData.json', json, 'utf8', (err)=>{
		            if(err){
				                console.log(err);
				            }
		        })
}


app.listen(app.get('port'), ()=> {
	console.log("Node app.js is running on port" + app.get('port'));
});
