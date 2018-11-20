const request = require("request");
const fs = require("fs");

let name = "K8GIS-1"
let apiKey = "117986.5w5ElPStqtCEEfG"
let url = `https://api.aprs.fi/api/get?name=${name}&what=loc&apikey=${apiKey}&format=json`;

const REQUESTRATE = 60 * 1000;  //How often to request APRS data in ms

let db;
let intervalId; //used to stop/change interval

module.exports = StartAprs = (database) =>{
    db = database;
    console.log(`Getting APRS data ${name} every ${REQUESTRATE / 1000} seconds\n`);
    RequestData();
    intervalId = setInterval(RequestData, REQUESTRATE);
}

function RequestData(){
    console.log(`Requesting APRS data`)
    request(url, (error, response, body) =>{
        if(error){
            console.log("Could not pull data, retrying");
            RequestData();
        }
        else if(body == null){
            console.log("Rate limit reached, decreasing request interval by 5 seconds");
            clearInterval(intervalId);
            REQUESTRATE += 5000;
            intervalId = setInterval(RequestData, REQUESTRATE)
        }
        else{
            console.log("Writing data to database\n");
            WriteData(body);
        }
    })
}

function WriteData(data){
    data = JSON.parse(data)
    db.insert(data.entries[0])
}