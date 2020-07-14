import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ExerList from './components/ExerList'
import Navbar from './components/Navbar'
import EditExer from './components/EditExer'
import CreateExer from './components/CreateExer'
import CreateUser from './components/CreateUser'

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br />
        <Route path='/' exact component={ExerList} />
        <Route path='/edit/:id' component={EditExer} />
        <Route path='/create' component={CreateExer} />
        <Route path='/user' component={CreateUser} />
      </div>
    </Router>
  )
}

export default App
