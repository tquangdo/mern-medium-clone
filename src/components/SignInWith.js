import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleLogin from 'react-google-login'
import {
    toggleClose,
} from '../redux/actions/CommonAction'
import {
    signUpGGUser,
} from '../redux/actions/UserAction'

class SignInWith extends Component {

    render() {
        const { signUpGGUser, toggleClose, modalMode, } = this.props
        const responseGoogle = res => {
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
            // build our user data
            signUpGGUser(postData)
            toggleClose()
        }

        return (
            <div>
                <div data-behavior="overlay" className={modalMode === true ? 'overlay overlay-hugeinc open' : 'overlay overlay-hugeinc'}>
                    <button onClick={toggleClose} className="overlay-close">ⓧ</button>
                    <nav>
                        <h2 className="grayed-heading center">Sign In</h2>
                        {/* chrome://flags/#same-site-by-default-cookies > Disable */}
                        <GoogleLogin className="button google"
                            clientId="835663596533-90ppjfdbj10je71j3q5s8uihdo25ere7.apps.googleusercontent.com"
                            //tra GG: "npm react-google-login"
                            //console.developers.google.com/apis/credentials > create "OAuth 2.0 Client IDs" > edit "Authorised JavaScript origins" > Add URI: "http://localhost:3000"
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
