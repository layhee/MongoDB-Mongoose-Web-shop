const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    img: {type: String},
    price: {type: Number, minimum: 1},
    qty: {type: Number, minimum: 1}
}, {timestamps: true}
)

module.exports = mongoose.model('Store', storeSchema)
