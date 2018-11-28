const request = require("request");

const apiKey = "117986.5w5ElPStqtCEEfG"
let intervalId; //used to stop/change interval
let requestRate; //Request APRS data time in ms
let url;

module.exports = StartAprs = (name, time) =>{
    requestRate = time * 1000;
    url = `https://api.aprs.fi/api/get?name=${name}&what=loc&apikey=${apiKey}&format=json`;
    console.log(`Getting APRS data ${name} every ${requestRate / 1000} seconds\n`);
    RequestData();
    intervalId = setInterval(RequestData, requestRate);
}

function RequestData(){
    console.log(`Requesting APRS data`)
    request(url, (error, response, body) =>{
        if(error){
            console.log("Could not pull data, retrying");
            RequestData();
        }
        else if(body == null){
            console.log("APRS API Rate limit reached, decreasing request interval by 10 seconds");
            clearInterval(intervalId);
            requestRate += 10000;
            intervalId = setInterval(RequestData, requestRate)
        }
        else{ // handle data received
            let data = JSON.parse(body);
            if(!data.entries.length){
                console.log('\tEmpty Aprs data, not saving to Database');
            }else{ //save to database
                data = data.entries[0];
                console.log(data)
                request.post('http://localhost:3000/insert', {
                    form:{
                        name: data.name,
                        lat: data.lat,
                        long: data.lng,
                        altitude: data.altitude
                    }
                })
            }
        }
    })
}

/*
function WriteData(data){
    data = JSON.parse(data)
    db.insert(data.entries[0])
}*/