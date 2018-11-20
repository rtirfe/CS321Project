const aprs = require("./aprs");
const database = require('./database');
let express = require('express');
let app = express();
const request = require("request");
const fs = require('fs')

let db;

app.set('port', (process.env.PORT || 3000));
app.use(express.json());

app.get("/", (req, res) => {
	res.send("This is root for CS321 Project.\n");
	res.end();
});

app.post("/insert", (req, res) =>{
	console.log(req.body)
	db.insert(req.body)
	res.sendStatus(200);
})

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


app.listen(app.get('port'), ()=> {
	console.log("Express server is running on port: " + app.get('port'));
	//connect to the database
	db = new database();
	
	//setTimeout(() =>{ aprs(db) }, 3000);	
});
