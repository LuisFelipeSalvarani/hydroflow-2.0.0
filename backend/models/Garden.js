const mongoose = require("mongoose")
const { Schema } = mongoose

const areaSchema = new Schema({
    name: String,
    plantType: String,
    description: String,
    deletedAt: {
        type: Date,
        default: null,
    }
})

const gardenSchema = new Schema({
    name: String,
    size: Number,
    cep: String,
    adress: String,
    number: Number,
    complement: String,
    district: String,
    city: String,
    state: String,
    description: String,
    areas: [areaSchema],
    deletedAt: {
        type: Date,
        default: null,
    }
},
{
    timestamps: true
})

const Garden = mongoose.model("Garden", gardenSchema)
const Area = mongoose.model("Area", areaSchema)

module.exports = { Garden, Area }