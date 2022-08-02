const express = require('express')

const {runValidation} = require('../validators/register')

const router = express.Router()

const {register} = require('../controllers/register')


router.post('/api/register',runValidation,register)

module.exports = router