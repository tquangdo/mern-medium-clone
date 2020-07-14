const expres = require('express')
// const bodyP = require('body-parser')
const mongoo = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = expres()
const port = process.env.PORT || 5000
app.use(cors())
// app.use(bodyP.json())
app.use(expres.json())

const uri = process.env.ATLAS_URI
mongoo.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const conn = mongoo.connection
conn.once('open', () => {
    console.log('MongoDB connection OK')
})

const exersRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')
app.use('/exercises', exersRouter)
app.use('/users', usersRouter)
app.listen(port, () => {
    console.log(`Port: ${port} de, server ga ugoiteiru`)
})