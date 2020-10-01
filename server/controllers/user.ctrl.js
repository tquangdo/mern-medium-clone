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
    getAll: (req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err))
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
                // tìm trong array user>followers>followings[] có id=req.params.id
                // "TranDo" có followings["NguyenA"] => getUserProfile("NguyenA") sẽ push followers["TranDo"]
                // "NguyenA&LeB" có followings["TranDo"] => getUserProfile("TranDo") sẽ push followers["NguyenA&LeB"]
                // KO có user nào có followings["LeB"] => getUserProfile("LeB") sẽ KO push followers
                const followerNames = []
                return User.find({ 'followings': req.params.id }).then(followerUsers => {
                    followerUsers.forEach(followerUser => {
                        followerNames.push(followerUser.name)
                        userProfile.addFollower(followerUser)
                    })
                    return Article.find({ 'users': req.params.id }).then(articles => {
                        return res.json({ user: userProfile, articles: articles, followerNames: followerNames })
                    })
                })
            }).catch(err => console.log(err))
    }
}