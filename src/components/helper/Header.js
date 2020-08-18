import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
    render() {
        return (
            <div>
                <div data-react-classname="UserOverlay">
                    <div className="overlay overlay-hugeinc " data-reactroot=""><button className="overlay-close">
                    </button>
                        <nav className="users-overlay">
                            <ul>
                                <li className="pagination-button-group"></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div data-behavior="progress-bar" className="progress-bar"></div>

                <nav data-behavior="animated-navbar" className="navbar navbar-default navbar-fixed-top is-inView">
                    <div className="container-fluid col-md-10 col-md-offset-1">
                        <div className="navbar-header">
                            <a className="navbar-brand" id="logo" href="/">
                                <img alt="Stories" src="/assets/img/stories-logo.svg" height="40" />
                            </a>
                        </div>
                        <ul className="nav navbar-header">
                            <li><a className="" href="/">Top stories</a></li>
                        </ul>

                        <div className="folding-nav">
                            <ul className="nav navbar-nav navbar-right">
                                {this.props.propsIsAuth ?
                                    <li className="new-post-button">
                                        <a className="button" data-behavior="trigger-overlay" href="/editor">Write a story</a>
                                    </li> :
                                    <button onClick={this.props.openSignInWith} className="button green-border-button">
                                        Sign in / Sign up
                                    </button>
                                }
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        propsIsAuth: state.reducerUser.isAuth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        openSignInWith: () => { dispatch({ type: 'TOGGLE_MODAL', modalMode: true }) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)