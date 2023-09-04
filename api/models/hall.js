const mongoose = require('mongoose');

const hallSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    capacity: String
});

module.exports = mongoose.model('Hall', hallSchema);