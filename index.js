var path = require('path')
const express = require('express')
var fileupload = require("express-fileupload");
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3333

app.use(fileupload())
app.use(express.json())

//route init
const route = require('./src/routes/app.route.js')


//config public resources
app.use('/public', express.static(path.join(__dirname, '/public')))

route(app)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})