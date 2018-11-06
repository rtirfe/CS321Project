const aprs = require("./aprs");
let express = require('express');
let app = express();
const request = require("request");
const fs = require('fs')

app.set('port', (process.env.PORT || 3000)); //gets a port to run our app

app.get("/", (req, res) => {
	res.send("This is root for CS321 Project.\n");
	res.end();
});

app.get('/getloc', (req, res) =>{
    let locationData = fs.readFileSync('./locationData.json', "utf8")
    locationData = JSON.parse(locationData)
	res.json(locationData);
});

app.get("*", (req,res, next) =>{
	var err = new Error();
	err.status = 500;
	next(err);
});

app.use( (err, req, res, next) =>{
	if(err.status != 500){
		return next();
	}
	res.send( err.message || " ** Invalide request ** \n");
});

app.listen(app.get('port'), ()=> {
	console.log("Server is running on port: " + app.get('port'));
	aprs();
});
