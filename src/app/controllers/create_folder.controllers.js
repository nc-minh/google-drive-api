var driver = require('../middleware/connect')

class AppControllers {

    //[POST: /api/create-folder]
    async createFolder(req, res, next) {
        const name = req.body.name
        
        try {
            const response = await driver.files.create({
                requestBody:{
                    name: name,
                    mimeType: 'application/vnd.google-apps.folder'
                }
            })
    
            console.log(response.data)
            res.status(200).json({
                message: 'Create folder successfully!',
                data: response.data,
                status: 'OK'
            })
    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: error.message
            })
        }

    }
}

module.exports = new AppControllers