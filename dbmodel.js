const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    name: {type: String, required: true},
    time: {type: String, required: true},
    lat: {type: Number, required: true},
    long: {type: Number, required: true},
    altitude: {type: Number, required: true},
    speed: {type: Number}
})

module.exports = mongoose.model('Aprs', schema);