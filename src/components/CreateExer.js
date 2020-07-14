import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import callAPI from '../utils/APICaller'

export default class CreateExer extends Component {
    state = {
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: [],
    }
    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration = e => {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({
            date: date
        })
    }
    componentDidMount = () => {
        callAPI('users', null)
            .then(res => {
                const { data } = res
                if (data.length > 0) {
                    this.setState({
                        users: data.map(user => user.username),
                        username: data[0].username,
                    })
                }
            })
            .catch(rej => {
                alert('Can NOT get users list from DB!!!')
            })
    }
    onSubmit = e => {
        e.preventDefault()
        const { username, description, duration, date } = this.state
        const exer = { username, desc: description, duration, date }
        callAPI('exercises/add', 'POST', exer)
            .then(res => {
                console.log(res.data)
                alert('Add exercise OK!')
                window.location = '/'
            })
            .catch(rej => {
                alert('Add exercise NG!!!')
            })
    }
    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option key={user} value={user}>
                                        {user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
