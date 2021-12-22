var express = require('express')
var router = express.Router()

const appControllers = require('../app/controllers/app.controllers')

router.get('/', appControllers.index)

module.exports = router