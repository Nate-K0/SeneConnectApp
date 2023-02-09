const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let profileSchema = new Schema({
    userName: String,
    profilePic: String,
    bio: String,
    followers: number,
    followedBy: [String],
    following: [String]
});

module.exports = profileSchema;