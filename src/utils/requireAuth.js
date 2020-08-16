import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function (ComponentArg) {
    class Authenticate extends Component {
        UNSAFE_componentWillMount() {
            if (!this.props.isAuth) {
                this.context.router.history.push('/')
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
            isAuth: state.reducerUser.isAuth
        }
    }
    return connect(mapStateToProps)(Authenticate)
}