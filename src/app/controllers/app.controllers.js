const path = require('path')
class AppControllers{
    index(req, res, next){
        var url = path.join(__dirname, '../../resources/views/index.html')
        res.sendFile(url)
    }
}

module.exports = new AppControllers