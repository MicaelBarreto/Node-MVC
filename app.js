const express = require('express')
const router = express.Router()
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./settings')
const IndexController = require('./controllers/IndexController')
const usersRoute = require('./routes/users')

const url = config.db

const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true }

mongoose.connect(url, options)
mongoose.set('useCreateIndex', true)

mongoose.connection.on('error', (err) => {
    console.log('Connection error with DB: '+err)
})

mongoose.connection.on('disconnected', () => {
    console.log('DB Disconnected')
})

mongoose.connection.on('connected', () => {
    console.log('Connected to DB')
})

app.set('view engine', 'ejs')

app.use(express.static('./app/public'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users', usersRoute)

app.get('/', IndexController.index)

app.listen(3000)

module.exports = app