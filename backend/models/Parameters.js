const mongoose = require("mongoose")
const { Schema } = mongoose

const parametersSchema = new Schema({
    deviceId: mongoose.ObjectId,
    areaId: mongoose.ObjectId,
    gardenId: mongoose.ObjectId,
    startTime: String,
    endTime: String,
    minTemp: String,
    maxTemp: String,
    minHumi: String,
    maxHumi: String,
    minFlow: String,
    maxFlow: String,
    days: Object,
    groupId: {
        type: mongoose.ObjectId,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
},
{
    timestamps: true
})

const Parameters = mongoose.model("Parameters", parametersSchema)

module.exports = Parameters