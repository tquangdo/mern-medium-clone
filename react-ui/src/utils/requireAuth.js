import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function (ComponentArg) {
    class Authenticate extends Component {
        UNSAFE_componentWillMount() {
            if (!this.props.propsIsAuth) {
                alert('Chưa login nên sẽ redirect về Home!!!')
                window.location = '/'
            }
        }
        render() {
            return (
                <ComponentArg {...this.props} />
            )
        }
    }
    const mapStateToProps = state => {
        return {
            propsIsAuth: state.reducerUser.isAuth
        }
    }
    return connect(mapStateToProps)(Authenticate)
}