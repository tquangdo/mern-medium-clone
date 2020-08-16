import * as actType from '../actions/ActionTypes'

const initialState = {
    articles: [],
    article: {}
}
const reducerArticle = (state = initialState, action) => {
    switch (action.type) {
        case actType.LOAD_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            }
        case actType.VIEW_ARTICLE:
            return {
                ...state,
                article: action.payload,
            }
        case actType.CLAP_ARTICLE:
            let article = Object.assign({}, state.article)
            article.claps++
            return {
                ...state,
                article: article
            }
        default:
            return state
    }
}

export default reducerArticle