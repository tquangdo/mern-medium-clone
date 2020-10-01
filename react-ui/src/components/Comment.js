import React, { Component } from 'react'

class Comment extends Component {
    hienCmt = () => {
        const { comments } = this.props
        let xhtmlCmts = null
        let cmt_users, cmt_text
        let user_name_1, user_pic_1
        if (comments) {
            xhtmlCmts = comments.map((cmt_item, chiso) => {
                const { users, text } = cmt_item
                cmt_text = text
                cmt_users = users
                if (cmt_users) {
                    const { name, provider_pic } = cmt_users
                    user_name_1 = name
                    user_pic_1 = provider_pic
                }
                return (
                    <div key={chiso} className="users-info">
                        <div clas="users-metadata">
                            <img alt={user_name_1} className="avatar-image" src={user_pic_1} height="50" width="50" />{user_name_1}
                        </div>
                        {cmt_text}
                    </div>
                )
            })
        }
        return xhtmlCmts
    }
    render() {
        return this.hienCmt() //nếu code sai: "return this.hienCmt" thì sẽ hiện ERR như dưới:
        //index.js:1 Warning: Functions are not valid as a React child. This may happen if you return 
        //a Component instead of < Component /> from render.Or maybe you meant to call this function rather than return it.
    }
}

export default Comment
