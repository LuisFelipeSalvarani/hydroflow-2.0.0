const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    username: String,
    password: String,
    isAdmin: Boolean,
},
{
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User