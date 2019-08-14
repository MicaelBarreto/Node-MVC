const express = require('express')
const app = express()
const router = express.Router()
const Users = require('../models/User')

class UserController{
    static async index(req, res, next) {
        const users = await Users.find({}).select('+password')
        return await res.render('../views/users/index', { title: 'Users', content: 'MVC', users, message: '' });
    }
    
    static async create(req, res, next){
        return res.render('../views/users/create', { title: 'Create User', content: 'MVC', message: '' })
    }
    
    static async store(req, res, next){
        const { name, email, password } = req.body
        var users =  Users.find({}).select('+password')
        if(!email || !password || !name) return res.render('../views/users/create', { title: 'Users', content: 'MVC', users, message: 'Input error' })
    
        try {
            if(await Users.findOne({ email })) return res.render('../views/users/create', { title: 'Create User', content: 'MVC', users, message: 'User already exists!' })
    
            await Users.create(req.body)
            users = await Users.find({}).select('+password')
    
            return res.render('../views/users/index', { title: 'Users', content: 'MVC', users, message: 'Success!' })
        } catch (error) {
            return res.render('../views/users/create', { title: 'Cretae User', content: 'MVC', users, message: 'Internal error' })
        }
    }
    
    static async show(req, res, next){
        var user = Users.findOne({ req }).select('+password')
        console.log(req.query)
        return res.render('../views/users/show', { message: '', user, title: 'Show', content: 'MVC' })
    }
}

module.exports = UserController


