const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    tittle: {type: String , required: true},
    category: {type: String , required: true},
    author: {type: String , required: true},
    image: {type: String, required: true},
    price: { type: Number, required: true},
    public_id: {type: String, required: true},
    created_at: {type: Date, default: Date.now()}
});

module.exports = model('Book', bookSchema);