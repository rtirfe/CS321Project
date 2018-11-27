const startAprs = require("./start-aprs");
const AprsModel = require('./dbmodel');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const session = require('express-session');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();
app.set('port', (process.env.PORT || 3000));

// -- MIDDLE-WARE -- //

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use Handlebars view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

// Set up sessions
app.use(session({
    secret: "#$#$^*&GBFSDF&^",
    resave: false,
    saveUninitialized: false,
}));

// -- ROUTES -- //

app.get("/", (req, res) => {
	res.send("This is root for CS321 Project.\n");
	res.end();
});

// Start aprs.fi requests 
app.get('/start', (req, res) =>{
	if(!req.session || !req.session.started){
		res.render("start")
	}else{
		res.render('error', {error: "APRS Process already started."})
	}
})

// Start aprs.fi requests handler
app.post('/start', (req, res)=>{
	if(req.body.name && req.body.time){
		req.session.started = true;
		startAprs(req.body.name, req.body.time);
		res.status(200).send('Okay, APRS requets started');
	}else{
		res.render("error", {error: "Invalid request, must pass name and time"})
	}
})

// Insert a new APRS record to the database
app.post("/insert", (req, res) =>{
	if(!req.body.name || !req.body.lat || !req.body.long || !req.body.altitude){
		res.status(400).send("Must send: name, lat, long, altitude");
		console.log("Bad insert request");
	}else{
		let aprsRecord = new AprsModel({
			name: req.body.name,
			time: Math.floor(Date.now() / 1000),
			lat: req.body.lat,
			long: req.body.long,
			altitude: req.body.altitude
		})

		aprsRecord.save((err) =>{
			if(err){
				console.log(err);
				res.status(500).send("Could not save record to database.");
			}
			else{
				res.status(200).send('New aprs record saved to the database');
				console.log("New aprs record saved to the database\n");
			}
		});
	}
})

// Display the map
app.get('/map', (req, res) =>{
	res.render('map');
});


app.listen(app.get('port'), ()=> {
	console.log("Express server is running on port: " + app.get('port'));

	//connect to the database
	let url = "mongodb://cs321:CS321GMU@ds113134.mlab.com:13134/heroku_ncnd7kfp";
	mongoose.connect(url, {useNewUrlParser: true}).then(() =>{
		console.log("Connected to the database");
	}).catch((err) =>{
		console.log("Error: could not connect to the database");
	})
});
