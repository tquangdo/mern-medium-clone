const articleCon = require('../controllers/article.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = router => {

    /**
     * get all articles
     */
    router
        .route('/articles')
        .get(articleCon.getAll)

    /**
     * add an article
     */
    router
        .route('/article')
        .post(multipartWare, articleCon.addArticle)

    /**
     * clap on an article
     */
    router
        .route('/article/clap')
        .post(articleCon.clapArticle)

    /**
     * comment on an article
     */
    router
        .route('/article/comment')
        .post(articleCon.commentArticle)

    /**
     * get a particlular article to view
     */
    router
        .route('/articles/:id')
        .get(articleCon.getArticle)
}