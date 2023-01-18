const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = new Schema({
    postDate: Date,
    featuredImage: String,
    caption: String,
    postedBy: String,
    comments: [{ author: String, comment: String, date: Date }],
    likes: Number,
    likedBy: [{username: String}]
});

module.exports = postSchema;
