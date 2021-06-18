const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
// const helmet = require('helmet')
// const cloudinary = require('cloudinary')
const path = require('path')
require('dotenv').config()

const app = express()
const router = express.Router()
const url = process.env.ATLAS_URI
// const url = 'mongodb://mean123:<pw>@cluster0-shard-00-00.lrc9z.mongodb.net:27017,cluster0-shard-00-01.lrc9z.mongodb.net:27017,cluster0-shard-00-02.lrc9z.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-wmahz9-shard-0&authSource=admin&retryWrites=true&w=majority'

/** configure cloudinary */
// cloudinary.config({
//     cloud_name: 'chidumennamdi',
//     api_key: '',
//     api_secret: ''
// })

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
        //useMongoClient: true
    })
    const conn = mongoose.connection
    conn.once('open', () => {
        console.log('MongoDB connection OK')
    })
} catch (error) {
    console.log(error)
}

const port = process.env.PORT || 5000

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
// app.use(helmet({
//    contentSecurityPolicy: false,
// }))

app.use('/api', router)
app.use(express.static(path.resolve(__dirname, '../react-ui/build')))
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
})

/** start server */
app.listen(port, () => {
    console.log(`Express server started at port: ${port}`)
})

module.exports = app