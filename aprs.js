const request = require("request");
const fs = require("fs");

let name = "K8GIS-1"
let apiKey = "117986.5w5ElPStqtCEEfG"
let url = `https://api.aprs.fi/api/get?name=${name}&what=loc&apikey=${apiKey}&format=json`;

const REQUESTRATE = 60 * 1000;  //How often to request APRS data in ms

let dataObj = {
    location: []
}

let intervalId; //used to stop/change interval

function RequestData(){
    console.log(`Requesting APRS data`)
    request(url, (error, response, body) =>{
        if(error){
            console.log("Could not pull data, retrying");
            RequestData();
        }
        else if(body == null){
            console.log("Rate limit reached, increasing request interval by 5 seconds");
            clearInterval(intervalId);
            REQUESTRATE += 5000;
            intervalId = setInterval(RequestData, REQUESTRATE)
        }
        else{
            console.log("Writing data to file\n");
            WriteData(body);
        }
    })
}

function WriteData(data){
    data = JSON.parse(data)
    dataObj.location.push(data.entries[0]);
    let json = JSON.stringify(dataObj);
    fs.writeFile('locationData.json', json, 'utf8', (err)=>{
        if(err){
            console.log(err);
        }
    })
}

module.exports = StartAprs = () =>{
    console.log(`Getting APRS data ${name} every ${REQUESTRATE / 1000} seconds\n`);
    RequestData();
    intervalId = setInterval(RequestData, REQUESTRATE);
}