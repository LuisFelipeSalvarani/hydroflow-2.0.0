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
    adress: String,
    number: Number,
    district: String,
    city: String,
    state: String,
    description: String,
    state: String,
    areas: {
        type: [areaSchema]
    },
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