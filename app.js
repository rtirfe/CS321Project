var express = require('express');
var app = express();
const request = require("request");
const nock = require('nock');
var fetch = require ('node-fetch');

app.set('port', (process.env.PORT || 3000)); //gets a port to run our app

app.get("/", (req, res) => {

	res.send("This is root for CS321 Project.\n");
	res.end();
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
	console.log("Node app.js is running on port: " + app.get('port'));
	//call aprs() function.
	var fetch = require ('node-fetch');
});
