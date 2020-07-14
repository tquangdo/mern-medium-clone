const router = require('express').Router()
let exercises = require('../models/exercises.model')

router.route('/').get((req, res) => {
    exercises.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})
//C
router.route('/add').post((req, res) => {
    const { username, desc, duration: durationBef, date: dateBef } = req.body
    const duration = Number(durationBef)
    const date = Date.parse(dateBef)
    const newExcer = new exercises({
        username, desc, duration, date,
    })
    newExcer.save()
        .then(() => res.json('Exercise ga tsuikadekita'))
        .catch(err => res.status(400).json('Error: ' + err))
})
//R
router.route('/:id').get((req, res) => {
    exercises.findById(req.params.id)
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})
//U
router.route('/update/:id').patch((req, res) => {
    const { username, desc, duration, date } = req.body
    exercises.findById(req.params.id)
        .then(exercises => {
            if (username && typeof username !== 'undefined') {
                exercises.username = username
            }
            if (desc && typeof desc !== 'undefined') {
                exercises.desc = desc
            }
            if (duration && typeof duration !== 'undefined') {
                exercises.duration = Number(duration)
            }
            if (date && typeof date !== 'undefined') {
                exercises.date = Date.parse(date)
            }
            exercises.save()
                .then(() => res.json('Exercise ga updatedekita'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})
//D
router.route('/:id').delete((req, res) => {
    exercises.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise ga sakujodekita'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router