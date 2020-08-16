import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    loadArticles
} from '../redux/actions/ArticleAction'
import AsideFeed from './helper/AsideFeed'

class Feed extends Component {
    UNSAFE_componentWillMount() {
        this.props.loadArticles()
    }
    render() {
        const { articles } = this.props
        const renderArticles = articles.reverse().map((article, chiso) =>
            <div key={chiso} className="post-panel">
                <div className="post-metadata">
                    <img alt="" className="avatar-image" src={article.users.provider_pic} height="40" width="40" />
                    <div className="post-info">
                        <div data-react-classname="PopoverLink">
                            <span className="popover-link" data-reactroot=""><a href={`/profile/${article.users._id}`}>{article.users.name}</a></span></div>
                        <small>Posted • A must read</small>
                    </div>
                </div>

                {article.feature_img.length > 0 ? <div className="post-picture-wrapper">
                    <img src={article.feature_img} alt="Thumb" />
                </div> : ''}

                <div className="main-body">
                    <h3 className="post-title"><a href={`/articleview/${article._id}`} >{article.text}</a></h3>
                    <div className="post-body">
                        <p dangerouslySetInnerHTML={{ __html: article.title }}></p>
                    </div>
                    <a className="read-more" href={`/articleview/${article._id}`}>Read more</a>
                </div>

                <div className="post-stats clearfix">
                    <div className="pull-left">
                        <div className="like-button-wrapper">
                            <i className="fa fa-heart-o"></i>
                            <span className="like-count">{' '}{article.claps}</span>
                        </div>
                    </div>
                    <div className="pull-right">
                        <div className="bookmark-button-wrapper">
                            <form className="button_to" method="get" action="">
                                <button data-behavior="trigger-overlay" type="submit">
                                    <span className="icon-bookmark-o"></span>
                                    <span>Bookmark</span>
                                </button>
                            </form>
                        </div>

                    </div>
                    <div className="response-count pull-right">
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                <div className="container-fluid main-container">
                    <div className="col-md-6 col-md-offset-1 dashboard-main-content">
                        <div className="posts-wrapper animated fadeInUp" data-behavior="endless-scroll" data-animation="fadeInUp-fadeOutDown">
                            {renderArticles}
                        </div>
                    </div>
                    {articles ? <AsideFeed articles={articles} /> : ''}
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        articles: state.reducerArticle.articles
    }
}

export default connect(mapStateToProps, { loadArticles })(Feed)