import React, { Component } from 'react'
import callAPI from '../utils/APICaller'

export default class CreateUser extends Component {
    state = {
        username: '',
    }
    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault()
        const { username } = this.state
        const user = { username }
        callAPI('users/add', 'POST', user)
            .then(res => {
                console.log(res.data)
                alert('Add user OK!')
            })
            .catch(rej => {
                alert('Add user NG!!!')
            })
    }
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
