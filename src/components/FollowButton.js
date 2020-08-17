import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    toggleOpen
} from '../redux/actions/CommonAction'
import {
    onFollow
} from '../redux/actions/UserAction'

/** renders bg white when user not follow, render green when followed */
class FollowButton extends Component {
    constructor(props) {
        super(props)
        this.followUser = this.followUser.bind(this)
    }
    followUser() {
        const { propsUser, fromPar_users_id, fromPar_following, onFollow, toggleOpen } = this.props
        // check user đang thao tác có login chưa?
        if (Object.keys(propsUser).length > 0) {
            // check user đang login (VT) có khác tác giả article (VP) hay ko?
            if (propsUser._id !== fromPar_users_id) {
                // check tác giả article (VP) đã có trong array followings[] hay chưa?
                if (fromPar_following.indexOf(fromPar_users_id) === -1) {
                    console.log('Follow tác giả article: ', fromPar_users_id)
                    onFollow(propsUser._id, fromPar_users_id)
                }
            }
        } else {
            console.log('KO thể follow user này!!!')
            toggleOpen()
        }
    }
    render() {
        const { fromPar_users_id, fromPar_following } = this.props
        let following = fromPar_following
        const f = following.indexOf(fromPar_users_id)
        return (
            <div>
                <div>
                    <button onClick={this.followUser} className={f === -1 ? "button green-border-button follow-button" : "button green-inner-button follow-button"}>
                        {f === -1 ? 'Follow' : 'Following'}
                    </button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        propsUser: state.reducerUser.user,
    }
}
export default connect(mapStateToProps, {
    onFollow,
    toggleOpen
})(FollowButton)