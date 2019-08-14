const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/',  UserController.index)
router.get('/create', UserController.create)

router.post('/store', UserController.store)
router.get('/:email/show', UserController.show)

module.exports = router



