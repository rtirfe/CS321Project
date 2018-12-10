![](demo.gif)
# CS 321 Flight Tracker

**Requirements**<br>
[Nodejs >= 11.3.0](https://nodejs.org/en/ "Nodejs >= 11.3.0")<br />
[MongoDB](https://docs.mongodb.com/manual/administration/install-community/ "MongoDB")

**Description**<br>
This program uses aprs.fi to request arps data from an object at a rate of 1 HZ. The data is kept in a local mongoDB database, and a record will be inserted after each aprs.fi request. The data will be displayed on a 3D map.

**How To Use**<br>
Make sure MongoDB database is running.<br>
From terminal cd into the root directory of this project and run: **node app.js** to initialize the interface which is a web server running on port 3000.<br>
Open your browser and type: **localhost:3000** in the address bar. This will open a page to enter the APRS station name you want to track from aprs.fi. Click **start** and the map will automatically open and update everytime a request is made to arps.fi

**Available HTTP routes**<br>
localhost:3000/drop       - Page with a form to drop and delete database<br>

Others<br>
POST localhost:3000/insert    - Insert a new record to the DB. Must pass: name, lat, long, altitude as from data. 
                                This is useful to integrade ARPS receiver method instead of aprs.fi.
