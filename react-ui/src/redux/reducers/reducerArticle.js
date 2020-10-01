import * as actType from '../actions/ActionTypes'

const initialState = {
    articles: [],
    article: {},
    loading: false,
}
const reducerArticle = (state = initialState, action) => {
    switch (action.type) {
        case actType.LOADING_POST_ARTICLE:
            return {
                ...state,
                loading: true,
            }
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
        case actType.POST_ARTICLE:
            alert('Đã tạo article thành công!')
            if (window.location.pathname !== '/') {
                window.location = '/'
            }
            return {
                ...state,
                loading: false,
                articles: [
                    action.payload,
                    ...state.articles,
                ]
            }
        default:
            return state
    }
}

export default reducerArticle