var driver = require('../middleware/connect')

class AppControllers {

    //[POST: /api/delete]
    async delete(req, res, next) {
        const id = req.body.id
        try {
            const response = await driver.files.delete({
                fileId: id
            })
            res.status(200).json({
                message: 'Delete successfully!',
                status: 'OK'
            })
        } catch (error) {
            console.log(error.message)
            res.json({
                error: error.message
            })
        }

    }
}

module.exports = new AppControllers