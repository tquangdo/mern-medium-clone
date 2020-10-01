import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    toggleOpen
} from '../redux/actions/CommonAction'
import {
    onFollow
} from '../redux/actions/UserAction'

class FollowButton extends Component {
    constructor(props) {
        super(props)
        this.followUser = this.followUser.bind(this)
    }
    followUser() {
        const { propsUser, fromPar_users_id, onFollow, toggleOpen } = this.props
        // check user đang thao tác có login chưa?
        if (Object.keys(propsUser).length > 0) {
            console.log(propsUser._id, ' follow tác giả article: ', fromPar_users_id)
            onFollow(propsUser._id, fromPar_users_id)
        } else {
            alert('Cần login để follow user này!!!')
            toggleOpen()
        }
    }
    hienButtonFollow = () => {
        const { propsUser, fromPar_users_id, fromPar_following, } = this.props
        // check tác giả article (VP) đã có trong array followings[] hay chưa?
        const f = fromPar_following.indexOf(fromPar_users_id)
        // check user đang login (VT) có khác tác giả article (VP) hay ko?
        const isKhacTacgia = (propsUser._id !== fromPar_users_id)
        let xhtml
        if (!isKhacTacgia) {
            xhtml = null
        } else if (f === -1) {
            xhtml =
                <button onClick={this.followUser}
                    className="button green-border-button follow-button">
                    Follow
                </button>
        } else {
            xhtml = <div>Following</div>
        }
        return xhtml
    }
    render() {
        return this.hienButtonFollow()
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