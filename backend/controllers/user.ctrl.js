const User = require('../models/user.model')
const Article = require('../models/article.model')

module.exports = {
    addUser: (req, res, next) => {
        new User(req.body).save((err, newUser) => {
            if (err)
                res.json(err)
            else if (!newUser)
                res.sendStatus(400)
            else
                res.send(newUser)
            next()
        })
    },
    getUser: (req, res) => {
        User.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.status(400).json('Error: ' + err))
    },
    followingUser: (req, res, next) => {
        User.findById(req.body.id).then(user => {
            return user.addFollowing(req.body.user_id).then(() => {
                return res.json({ msg: "Đã follow user khác" })
            })
        }).catch(next)
    },
    getUserProfile: (req, res) => {
        User.findById(req.params.id).then
            (userProfile => {
                return User.find({ 'followings': req.params.id }).then(followerUsers => {
                    followerUsers.forEach(followerUser => {
                        userProfile.addFollower(followerUser)
                        // nguyên cả hàm chỉ có return mà KO save() nên users>followers[] sẽ luôn blank!
                    })
                    return Article.find({ 'users': req.params.id }).then(articles => {
                        return res.json({ user: userProfile, articles: articles })
                    })
                })
            }).catch(err => console.log(err))
    }
}