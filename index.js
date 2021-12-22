var path = require('path')
const express = require('express')
const app = express()
const port = 3333

//route init
const route = require('./src/routes/app.route.js')


//config public resources
app.use('/public', express.static(path.join(__dirname, '/public')))


route(app)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})