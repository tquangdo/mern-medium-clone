import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cmtArticle } from '../redux/actions/ArticleAction'

class CommentForm extends Component {
    state = {
        comment: '',
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const { propsReducerUser, fromParPropsArticleID, cmtArticle } = this.props
        const { comment } = this.state
        cmtArticle({
            comment: comment,
            user_id: propsReducerUser.user._id,
            article_id: fromParPropsArticleID,
        })
    }
    render() {
        const { propsReducerUser } = this.props
        const { comment } = this.state
        const cmtFormMarkup = propsReducerUser.isAuth ? (
            <div className="bookmark-button-wrapper">
                <form className="button_to" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Comment: </label>
                        <div />
                        {' '}
                        <textarea value={comment} name='comment' onChange={this.handleChange} placeholder="Write a comment..." />
                    </div>
                    <button data-behavior="trigger-overlay" type="submit">
                        <span>Send</span>
                    </button>
                </form>
            </div>
        ) : <small>(Cần login để có thể comment!)</small>
        return cmtFormMarkup
    }
}
const mapStateToProps = state => ({
    propsReducerUser: state.reducerUser,
})

export default connect(mapStateToProps, {
    cmtArticle,
})(CommentForm)
