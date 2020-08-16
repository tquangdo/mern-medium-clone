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
        const { propsUser, to_follow, onFollow, user, toggleOpen } = this.props
        // check if user is signed in.
        if (Object.keys(propsUser).length > 0) {
            // check if user is not the same person to follow
            if (propsUser._id !== to_follow) {
                // check if you are not already following him
                if (user.indexOf(to_follow) === -1) {
                    onFollow(propsUser._id, to_follow)
                }
            }
        } else {
            toggleOpen()
        }
    }
    render() {
        const { to_follow, user } = this.props
        let following = user
        const f = following.indexOf(to_follow)
        return (
            <div>
                <div>
                    <div onClick={this.followUser} data-reactroot=""><a className={f === -1 ? "button green-border-button follow-button" : "button green-inner-button follow-button"} href="/">{f === -1 ? 'Follow' : 'Following'}</a></div>
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