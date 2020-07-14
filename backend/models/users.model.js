const mongoo = require('mongoose')
const usersSchem = new mongoo.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
}, {
    timestamps: true,
})
const users = mongoo.model('users', usersSchem)
module.exports = users

