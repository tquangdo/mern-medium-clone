import callAPI from '../../utils/APICaller'
import * as actType from './ActionTypes'

export const loadArticles = () => dispatch => {
    callAPI('articles')
        .then(res => {
            dispatch({ type: actType.LOAD_ARTICLES, payload: res.data, })
        })
        .catch((err) => console.log(err))
}

export const getArticle = article_id => dispatch => {
    callAPI(`articles/${article_id}`)
        .then(res => {
            dispatch({ type: actType.VIEW_ARTICLE, payload: res.data, })
        })
        .catch((err) => console.log(err))
}

export const cmtArticle = cmt_data => (dispatch) => {
    callAPI('article/comment', 'POST', cmt_data) //cmt_data: comment, user_id, article_id
        .then(() => {
            dispatch(getArticle(cmt_data.article_id))
        })
        .catch(err => {
            console.log(err)
        })
}

export const clap = article_id => dispatch => {
    callAPI('article/clap', 'POST', { article_id })
        .then((res) => {
            dispatch({
                type: actType.CLAP_ARTICLE
            })
        }).catch((err) => console.log(err))
}

export const publishStory = post_article => dispatch => {
    dispatch({ type: actType.LOADING_POST_ARTICLE })
    callAPI('article', 'POST', post_article)
        .then((res) => {
            dispatch({
                type: actType.POST_ARTICLE,
                payload: res.data,
            })
        }).catch((err) => console.log(err))
}
