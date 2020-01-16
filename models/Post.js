const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: String
})

const Post = mongoose.model("Post", postSchema)


module.exports = Post