import callAPI from '../../utils/APICaller'
import * as actType from './ActionTypes'

export function getUser(_id) {
    return callAPI(`users/${_id}`)
        .then((res) => {
            return res.data
        }).catch(err => console.log(err))
}

export function getUserProfile(_id) {
    return (dispatch) => {
        callAPI(`users/profile/${_id}`).then((res) => {
            let profile = res.data
            dispatch({ type: actType.SET_PROFILE, profile })
        }).catch(err => console.log(err))
    }
}

//id, user_id
export function onFollow(id, user_id) {
    console.log(`${id} following ${user_id}`)
    return (dispatch) => {
        callAPI('user/follow', 'POST', { id, user_id }).then((res) => {
            dispatch({ type: actType.FOLLOW_USER, user_id })
        }).catch((err) => console.log(err))
    }
}

export function signInUser(user_data) {
    return (dispatch) => {
        console.log('adding us..')
        callAPI('user', 'POST', user_data).then((res) => {
            let user = res.data
            console.log('==================signin=======')
            console.log(user)
            console.log('==================signin=======')
            localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({ type: actType.SET_USER, user })
        }).catch((err) => console.log(err))
    }
}