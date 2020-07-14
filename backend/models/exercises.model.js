const mongoo = require('mongoose')
const exercisesSchem = new mongoo.Schema({
    username: { type: String, required: true, },
    desc: { type: String, required: true, },
    duration: { type: Number, required: true, },
    date: { type: Date, required: true, },
}, {
    timestamps: true,
})
const exercises = mongoo.model('exercises', exercisesSchem)
module.exports = exercises

