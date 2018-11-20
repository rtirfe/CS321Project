const MongoClient = require('mongodb').MongoClient;

class database {
    constructor() { //connects to database
        // Connection URL
        const url = 'mongodb://cs321:CS321GMU@ds113134.mlab.com:13134/heroku_ncnd7kfp';

        let self = this;
        MongoClient.connect(url, function(err,db){
            if(err){ throw err; }
            else {
                self.db = db;
                console.log('connected to database.');
                //db.close();
            }
         })
    }

    insert(obj){
        this.db.collection('test').insertOne(obj)
    }
    
}

module.exports = database;