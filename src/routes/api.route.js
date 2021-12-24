var express = require('express')
var router = express.Router()

const uploadControllers = require('../app/controllers/upload.controllers')

router.post('/upload', uploadControllers.upload)

module.exports = router