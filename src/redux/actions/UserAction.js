import callAPI from '../../utils/APICaller'
import * as actType from './ActionTypes'

function loadUsers() {
    return callAPI('users')
}

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
    return (dispatch) => {
        callAPI('user/follow', 'POST', { id, user_id }).then((res) => {
            dispatch({ type: actType.FOLLOW_USER, user_id })
        }).catch((err) => console.log(err))
    }
}

export const signUpGGUser = user_data => dispatch => {
    loadUsers()
        .then((res) => {
            const allUsers = res.data
            const chiso = allUsers.findIndex(user => user.email === user_data.email)
            if (chiso !== -1) {
                console.log('==================user existed=======')
                const jsonUser = {
                    _id: allUsers[chiso]._id,
                    followers: allUsers[chiso].followers,
                    followings: allUsers[chiso].followings,
                    ...user_data,
                }
                localStorage.setItem('Auth', JSON.stringify(jsonUser))
                dispatch({
                    type: actType.SET_USER, user: jsonUser
                })
            } else {
                callAPI('user', 'POST', user_data).then((res) => {
                    const user = res.data
                    console.log('==================signUpGGUser=======')
                    localStorage.setItem('Auth', JSON.stringify(user))
                    dispatch({ type: actType.SET_USER, user })
                }).catch((err) => console.log(err))
            }
        }).catch(err => {
            console.log(err)
        })
}