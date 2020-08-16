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

// article_id, user_id, comment
// export function comment() {
//     return (dispatch) => {

//     }
// }
//req.body.article_id
export function clap(article_id) {
    return (dispatch) => {
        callAPI('article/clap', 'POST', { article_id }).then((res) => {
            dispatch({
                type: actType.CLAP_ARTICLE
            })
        }).catch((err) => console.log(err))
    }
}
