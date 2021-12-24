const appRouter = require('./api.route')
const homeRouter = require('./home.route')
function route(app){
    
    app.use('/api', appRouter)
    app.use('/', homeRouter)

}

module.exports = route