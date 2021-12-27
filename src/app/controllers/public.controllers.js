var driver = require('../middleware/connect')

class AppControllers {

    //[POST: /api/public]
    async public(req, res, next) {
        //public - everyone - reader
        const id = req.body.id

        try {
            const fileId = id
            await driver.permissions.create({
                fileId: fileId,
                requestBody:{
                    role: 'reader',
                    type: 'anyone'
                }
            })
    
            const result = await driver.files.get({
                fileId: fileId,
                fields: 'webViewLink, webContentLink'
            })
            console.log(result.data);
            res.status(200).json({
                status: 'OK',
                message: 'Public successfully!',
                data: result.data,
                id: fileId
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