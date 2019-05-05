const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    event: {type: String, required: true},
    type: { type: String, required: true },
    date: { type: String, required: true },
});

module.exports = mongoose.model('Event', EventSchema);