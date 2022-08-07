const express = require('express')

const {runValidation} = require('../validators/login')

const router = express.Router()

const {login} = require('../controllers/register')

router.post('/api/login',runValidation,login)

module.exports = router