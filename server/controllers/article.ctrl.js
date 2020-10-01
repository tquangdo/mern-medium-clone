const Article = require('../models/article.model')
const User = require('../models/user.model')
const fs = require('fs')
// const cloudinary = require('cloudinary')

module.exports = {
    addArticle: (req, res, next) => {
        let { text, title, claps, description, feature_img, user_id } = req.body
        // const { image } = req.files
        // if (image) {
        //     cloudinary.uploader.upload(image.path, result => {
        //         let obj = {
        //             text, title, claps, description,
        //             feature_img: result.url != null ? result.url : ''
        //         }
        //         saveArticle(obj)
        //     }, {
        //         resource_type: 'image',
        //         eager: [
        //             { effect: 'sepia' }
        //         ]
        //     })
        // } else {
        // saveArticle({ text, title, claps, description, feature_img: '' })
        // }
        saveArticle({ text, title, claps, description, feature_img })
        function saveArticle(obj) {
            new Article(obj).save((err, article) => {
                if (err)
                    res.json(err)
                else if (!article)
                    res.sendStatus(400)
                else {
                    return article.addArticleUser(user_id).then(article => {
                        return res.json(article)
                    })
                }
                next()
            })
        }
    },
    getAll: (req, res, next) => {
        Article.find()
            .populate('users')
            .populate('comments.users')
            .exec()
            .then(arti => res.json(arti))
            .catch(err => res.status(400).json('Error: ' + err))
    },

    /**
     * article_id
     */
    clapArticle: (req, res, next) => {
        Article.findById(req.body.article_id).then(article => {
            return article.clap().then(() => {
                return res.json({ msg: "Đã clap article" })
            })
        }).catch(next)
    },

    /**
     * comment, user_id, article_id
     */
    commentArticle: (req, res, next) => {
        const { article_id, user_id, comment } = req.body
        Article.findById(article_id).then(article => {
            return article.onComment({
                users: user_id,
                text: comment
            }).then(() => {
                return res.json({ msg: "Đã cmt article" })
            })
        }).catch(next)
    },

    /**
     * article_id
     */
    getArticle: (req, res, next) => {
        Article.findById(req.params.id)
            .populate('users')
            .populate('comments.users')
            .exec((err, article) => {
                if (err)
                    res.json(err)
                else if (!article)
                    res.sendStatus(404)
                else
                    res.json(article)
                next()
            })
    }
}