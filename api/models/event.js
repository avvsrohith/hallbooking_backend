const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    personName: String,
    personContact: String,
    date: String,
    hall: String,
    eventname: String,
    starttime: String,
    endtime: String
});

module.exports = mongoose.model('Event', eventSchema);