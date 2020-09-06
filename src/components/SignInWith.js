import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import {
    toggleClose,
} from '../redux/actions/CommonAction'
import {
    signUpGGUser,
} from '../redux/actions/UserAction'
import { GG_CLIENT_ID } from '../constants/ConfigConst'

class SignInWith extends Component {

    render() {
        const { signUpGGUser, toggleClose, modalMode, } = this.props
        const responseGoogle = res => {
            if (typeof res.profileObj !== 'undefined') {
                const { profileObj, accessToken } = res
                const { name, email, googleId, imageUrl } = profileObj
                const postData = {
                    name: name,
                    provider: 'google',
                    email: email,
                    provider_id: googleId,
                    token: accessToken,
                    provider_pic: imageUrl,
                }
                signUpGGUser(postData)
                toggleClose()
            }
        }

        return (
            <div>
                <div data-behavior="overlay" className={modalMode === true ? 'overlay overlay-hugeinc open' : 'overlay overlay-hugeinc'}>
                    <button onClick={toggleClose} className="overlay-close">ⓧ</button>
                    <nav>
                        <h2 className="grayed-heading center">Sign In</h2>
                        <GoogleLogin className="button google"
                            clientId={GG_CLIENT_ID}
                            buttonText="SignIn with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </nav>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        modalMode: state.reducerCommon.modalMode
    }
}

export default connect(mapStateToProps, {
    toggleClose,
    signUpGGUser
})(SignInWith)
