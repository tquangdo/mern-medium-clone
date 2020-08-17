import React, { Component } from 'react';
import { connect } from 'react-redux'
import FollowButton from './FollowButton'
import {
    getUserProfile,
} from '../redux/actions/UserAction'

class Profile extends Component {
    componentDidMount() {
        document.body.className = 'users show'
    }
    componentWillUnmount() {
        document.body.className = ''
    }
    UNSAFE_componentWillMount() {
        const { getUserProfile, match } = this.props
        getUserProfile(match.params.id)
    }
    render() {
        return (
            <div>
                {Object.keys(this.props.propsProfile).length > 0 ? <ItemList items={this.props} /> : ''}
            </div>
        )
    }
}

function ItemList({ items }) {
    const { propsProfile, propsUser } = items
    const { user } = propsProfile
    return (
        <div className="users show">
            <div className="container-fluid main-container">
                <div className="banner-container animated fadeInUp-small" data-animation="fadeInUp-fadeOutDown-slow">
                    <div className="hero-wrapper">
                        <header className="hero">
                            <div className="profile-info">
                                <h1 className="hero-title">{user.name}</h1>
                                <p className="hero-description">{user.email}</p>
                                <div className="hero-location">
                                    <i className="fa fa-map-marker"></i>{user.provider}
                                </div>
                            </div>
                            <div className="hero-avatar">
                                <img alt={user.name} className="avatar-image" src={user.provider_pic} height="100" width="100" />
                            </div>
                            <div>{propsUser.name ? <FollowButton fromPar_following={`${propsUser.followings}`} fromPar_users_id={`${user._id}`} /> : ''}</div>
                        </header>

                        <div>
                            <div data-react-classname="UserFollowContainer" data-react-props="{&quot;followerCount&quot;:6,&quot;followingCount&quot;:2,&quot;following&quot;:false,&quot;followed_id&quot;:396,&quot;hideButton&quot;:false,&quot;username&quot;:&quot;mark&quot;,&quot;overlayTrigger&quot;:true}">
                                <div data-reactroot="">
                                    <div className="following-metadata">
                                        <span className="following-count">
                                            <span>
                                                <span><b>{user.followings.length}</b> Following
                                                </span>
                                            </span>
                                        </span>
                                        <span className="follower-count">
                                            <span>
                                                <span><b>{user.followers.length}</b> Followers
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="posts-wrapper animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                    <h4 className="small-heading border-top">latest</h4>
                    {propsProfile.articles.map((article, chiso) => {
                        const { feature_img, _id, claps, title, description, comments } = article
                        return <div key={chiso} className="post-panel">

                            <div className="post-metadata">
                                <img alt="mark" className="avatar-image" src={user.provider_pic} height="40" width="40" />
                                <div className="post-info">
                                    <div data-react-classname="PopoverLink"><span className="popover-link" data-reactroot="">{user.name}</span></div>
                                    <small>Published • a must read</small>
                                </div>
                            </div>

                            {feature_img.length > 0 ? <div className="post-picture-wrapper">
                                <img src={feature_img} alt="alt" />
                            </div> : ''}

                            <div className="main-body">
                                <h3 className="post-title"><a href={`/articleview/${_id}`}>{title}</a></h3>
                                <div className="post-body">
                                    <p className="" dangerouslySetInnerHTML={{ __html: description }}></p>
                                </div>
                                <a className="read-more" href={`/articleview/${_id}`}>Read more</a>
                            </div>

                            <div className="post-stats clearfix">
                                <div className="pull-left">
                                    <div className="like-button-wrapper">
                                        <i className="fa fa-heart-o"></i>
                                        <span className="like-count">{claps}</span>
                                    </div>
                                </div>
                                <div className="pull-left">{'  '}</div>
                                <div className="pull-left">
                                    <div className="response-icon-wrapper">
                                        <i className="fa fa-comment-o"></i>
                                        <span className="response-count" data-behavior="response-count">{comments.length}</span>
                                    </div>
                                </div>

                                <div className="pull-right">
                                    <div className="bookmark-button-wrapper">
                                        <form className="button_to" method="get" action=""><button className="bookmark-button" data-behavior="trigger-overlay" type="submit">
                                            <span className="icon-bookmark-o"></span>
                                            <span className="hide-text">Bookmark</span>
                                        </button>
                                        </form>
                                    </div>

                                </div>

                                <div className="response-count pull-right">
                                    0 bookmark
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        propsArticle: state.reducerArticle.article,
        propsUser: state.reducerUser.user,
        propsProfile: state.reducerUser.profile,
    }
}
export default connect(mapStateToProps, {
    getUserProfile,
})(Profile)