/** require dependencies */
const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
// const cloudinary = require('cloudinary')
require('dotenv').config()

const app = express()
const router = express.Router()
const url = process.env.ATLAS_URI
//1) user:"mean123": Atlas > DB Access > Add new DB user > "mean123" > Read & write to any DB
//2) Atlas > NW Access > IP Whitelist > Add IP address > Whitelist Entry: "0.0.0.0/0"
//3) ATLAS_URI: Atlas > Clusters > Cluster0: Overview > Connect > Connect your app > Driver="Node.js" & Version="2.2.12 OR LATER"!!!

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

const port = 5000 || process.env.PORT

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
