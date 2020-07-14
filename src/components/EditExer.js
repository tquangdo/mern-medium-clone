import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import callAPI from '../utils/APICaller'

export default class EditExer extends Component {
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
        const { id } = this.props.match.params
        callAPI(`exercises/${id}`, null)
            .then(res => {
                const { username, desc, duration, date } = res.data
                this.setState({
                    username: username,
                    description: desc,
                    duration: duration,
                    date: new Date(date),
                })
            })
            .catch(rej => {
                alert('Can NOT get exercise from DB!!!')
            })
        callAPI('users', null)
            .then(res => {
                const { data } = res
                if (data.length > 0) {
                    this.setState({
                        users: data.map(user => user.username),
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
        const { id } = this.props.match.params
        callAPI(`exercises/update/${id}`, 'PATCH', exer)
            .then(res => {
                console.log(res.data)
                alert('Update exercise OK!')
                window.location = '/'
            })
            .catch(rej => {
                alert('Update exercise NG!!!')
            })
    }
    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
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
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
