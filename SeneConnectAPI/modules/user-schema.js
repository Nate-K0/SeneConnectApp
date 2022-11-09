const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: String,
    userName: String,
    password: String,
});

module.exports = userSchema;