var driver = require('../middleware/connect')

class AppControllers {

    //[DELETE: /api/delete/:id]
    async delete(req, res, next) {
        const id = req.params.id
        try {
            const response = await driver.files.delete({
                fileId: id
            })

            console.log(response)
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