import * as actType from '../actions/ActionTypes'

const initialState = {
    user: {},
    isAuth: false,
    profile: {}
}

const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case actType.SET_USER:
            console.log('setting user...')
            return {
                ...state,
                isAuth: Object.keys(action.user).length > 0 ? true : false,
                user: action.user
            }
        case actType.FOLLOW_USER:
            let user = Object.assign({}, state.user)
            user.followings.push(action.user_id)
            console.log('following user...')
            return {
                ...state,
                user: user
            }
        case actType.SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }
}

export default reducerUser
