const mongoose = require("mongoose")
const { Schema } = mongoose

const deviceSchema = new Schema({
    name: String,
    serial: String,
    areaId: mongoose.ObjectId,
    gardenId: mongoose.ObjectId,
    description: String,
    deletedAt: {
        type: Date,
        default: null,
    }
},
{
    timestamps: true
})

const Device = mongoose.model("Device", deviceSchema)

module.exports = Device