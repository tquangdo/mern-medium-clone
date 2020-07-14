import React, { Component } from 'react'
import callAPI from '../utils/APICaller'
import { Link } from 'react-router-dom'

const Exercise = props => (
    < tr >
        <td>{props.exer.username}</td>
        <td>{props.exer.desc}</td>
        <td>{props.exer.duration}</td>
        <td>{props.exer.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exer._id}>edit</Link>
            {' '}|{' '}
            <a href="/" onClick={() => {
                props.delExer(props.exer._id)
            }}>
                delete</a>
        </td>
    </tr >
)

export default class ExerList extends Component {
    state = { exercises: [], }
    componentDidMount() {
        callAPI('exercises', null)
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch(error => {
                alert('Can NOT get exercises list from DB!!!')
            })
    }

    delExer = (id) => {
        callAPI(`exercises/${id}`, 'DELETE', null)
            .then(response => { console.log(response.data) })
            .catch(error => {
                alert('Can NOT delete exercise from DB!!!')
            })

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(curExer => {
            return <Exercise exer={curExer} delExer={this.delExer} key={curExer._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
