const aprs = require("./aprs");
const database = require('./database');
let express = require('express');
let app = express();
const request = require("request");
const fs = require('fs')

app.set('port', (process.env.PORT || 3000));

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
	console.log("Express server is running on port: " + app.get('port'));
	//connect to the database
	let db = new database();
	
	setTimeout(function(){ 
		aprs(db); }, 3000);
});
