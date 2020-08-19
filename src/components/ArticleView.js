import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    loadArticles,
    getArticle,
    clap,
} from '../redux/actions/ArticleAction'
import FollowButton from './FollowButton'
import CommentForm from './CommentForm'
import Comment from './Comment'

class ArticleView extends Component {
    componentDidMount() {
        const { getArticle, match, loadArticles } = this.props
        loadArticles()
        getArticle(match.params.id)
        document.body.className = 'posts show'
    }
    componentWillUnmount() {
        document.body.className = ''
    }

    render() {
        const { propsArticles, propsArticle, propsUser, clap } = this.props
        const { _id: article_id, description, claps, title, feature_img, users, comments } = propsArticle
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // 1)Chú ý kỹ chỗ khác nhau khi tự sửa code có sẵn để optimize (code dưới đây)
        // 2)Khi bị lỗi KO hiện lên page > render() lỗi > console.log(this.props.mapStateToProps) sẽ KO thể debug OK!!!
        // > muốn debug phải sửa sao cho page hiện lên OK
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        let user_name, user_pic, user_id
        if (users) {
            const { name, provider_pic, _id } = users
            user_name = name
            user_id = _id
            user_pic = provider_pic
        }
        const relateStories = propsArticles
            .filter(article => (article.users._id === user_id && article._id !== article_id))
            .map((article, chiso) =>
                <div key={chiso}>
                    <div className="count-button-wrapper">
                        <span className="count-button">{chiso + 1}</span>
                    </div>
                    <a className="post-title" href={`/articleview/${article._id}`}>{article.title}</a>
                </div>
            )
        let cmt_length = 0
        if (comments) {
            cmt_length = comments.length
        }
        return (
            <div>
                <div className="container-fluid main-container">
                    <div className="row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                        <div id="main-post" className="col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content">

                            <div className="pull-right">
                                {propsUser.length > 0 ? <FollowButton fromPar_following={`${propsUser.following}`} fromPar_users_id={`${user_id}`} /> : ''}
                            </div>

                            <div className="post-metadata">
                                <img alt={user_name} className="avatar-image" src={user_pic} height="40" width="40" />
                                <div className="post-info">
                                    <div data-react-classname="PopoverLink">
                                        <span className="popover-link" data-reactroot="">
                                            <a href={`/profile/${user_id}`}>{user_name}</a>
                                        </span>
                                    </div>
                                    <small>Published • nice story</small>
                                </div>
                            </div>


                            {!feature_img || !feature_img.length > 0 ? '' : <div className="post-picture-wrapper">
                                <img src={feature_img} alt="feature img 500" height="500" />
                            </div>}

                            <h3 className="title">{title}</h3>
                            <div className="body">
                                <p />
                                <p className="" dangerouslySetInnerHTML={{ __html: description }} />
                                <p />
                            </div>

                            <div className="post-tags">
                                <a className="tag" href="/">Back to home</a>
                            </div>

                            <div className="post-stats clearfix">
                                <div className="pull-left">
                                    <div className="like-button-wrapper">
                                        <button onClick={() => clap(article_id)} className="like-button" data-behavior="trigger-overlay" type="submit">
                                            <i className="fa fa-heart-o"></i>
                                        </button>
                                        <span className="like-count">{claps}</span>
                                    </div>
                                </div>
                                <div className="pull-left">
                                    <div className="response-icon-wrapper">
                                        <i className="fa fa-comment-o"></i>
                                        <span className="response-count" data-behavior="response-count">{
                                            cmt_length
                                        }</span>
                                    </div>
                                </div>
                                <div className="pull-right">
                                    <CommentForm fromParPropsArticleID={article_id} />
                                </div>
                            </div>
                            <Comment comments={comments} />
                        </div>
                    </div>

                    <div className="post-show-footer row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
                        <div className="col-xs-10 col-md-6 col-xs-offset-1 col-md-offset-3 main-content related-stories">
                            <h4 className="small-heading">Related stories</h4>
                            {relateStories}
                            <div className="post-list-item">
                            </div>
                        </div>
                    </div>

                    <div className="post-metadata-bar" data-page="post-metadata-bar">
                        <div className="flex-container is-inView" data-behavior="animated-metadata">
                            <div className="metabar-users-info flex-container flex-space-btw">
                                <div>
                                    <img alt={user_name} className="avatar-image" src={user_pic} height="35" width="35" />
                                    <div data-react-classname="PopoverLink" >
                                        <span className="popover-link" data-reactroot="">
                                            <a href={`/profile/${user_id}`}>{user_name}</a>
                                        </span>
                                    </div>
                                </div>
                                <div data-react-classname="UserFollowButton" >
                                    {propsUser.length > 0 ? <FollowButton fromPar_following={`${propsUser.following}`} fromPar_users_id={`${user_id}`} /> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        propsArticles: state.reducerArticle.articles,
        propsArticle: state.reducerArticle.article,
        propsUser: state.reducerUser.user,
    }
}

export default connect(mapStateToProps, {
    loadArticles,
    getArticle,
    clap,
})(ArticleView)
