const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let profileSchema = new Schema({
    userName: String,
    profilePic: String,
    bio: String,
    followers: Number,
    followedBy: [String],
    following: [String]
});

module.exports = profileSchema;