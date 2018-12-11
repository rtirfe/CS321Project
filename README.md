![](demo.gif)
# CS 321 Flight Tracker

**Description**<br>
This program uses aprs.fi to request arps data from an object at a rate of 1 HZ. The data is kept in remote mongoDB database, and a record will be inserted after each aprs.fi request. The data will be displayed on an interactive 3D map.

**How To Use**<br>
Visit https://cs321project.herokuapp.com
This will open a page to enter the APRS station name you want to track from aprs.fi. Click **start** and the map will automatically open and update everytime a request is made to arps.fi

**Available HTTP routes**<br>
https://cs321project.herokuapp.com/drop       - Page with a form to drop and delete database<br>

