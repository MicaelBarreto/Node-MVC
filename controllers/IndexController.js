const express = require('express')
const app = express()
const router = express.Router()
const Users = require('../models/User')

class IndexController {
    static async index(req, res, next){
        return res.render('../views/index', { title: 'Index', content: 'MVC' });
    }
}

module.exports = IndexController

