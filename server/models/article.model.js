const mongoose = require('mongoose')
const { Schema, model } = mongoose
const articleSchem = new Schema({
    text: String,
    title: String,
    description: String,
    feature_img: String,
    claps: Number,
    users: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [
        {
            users: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            text: String
        }
    ]
})
articleSchem.methods.clap = function () {
    this.claps++
    return this.save()
}
articleSchem.methods.onComment = function (cmt) {
    this.comments.push(cmt)
    return this.save()
}
articleSchem.methods.addArticleUser = function (user_id) {
    this.users = user_id
    return this.save()
}

module.exports = model('article', articleSchem)

