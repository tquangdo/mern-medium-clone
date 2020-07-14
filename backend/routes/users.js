const router = require('express').Router()
let users = require('../models/users.model')

router.route('/').get((req, res) => {
    users.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/add').post((req, res) => {
    const { username } = req.body
    const newUser = new users({ username, })
    newUser.save()
        .then(() => res.json('User ga tsuikadekita'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router