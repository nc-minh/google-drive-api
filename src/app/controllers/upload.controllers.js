var driver = require('../middleware/connect')
const fs = require('fs')
var multer = require('multer')
const { file } = require('googleapis/build/src/apis/file')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../../../public/data');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})

var _upload = multer({ storage: storage }).single('myfile')

class AppControllers {

    //[POST: /api/upload]
    async upload(req, res, next) {

        _upload(req,res,function(err){
            if(err){
                return res.end('Error uploading file')
            }
    
            res.end('File is uploaded successfully')
        })


        var filepath = req.body.filepath
        var name = req.body.name
        console.log(fs.createReadStream(filepath));
        try {
            const response = await driver.files.create({
                requestBody:{
                    name: name,
                },
                media:{
                    body: fs.createReadStream(filepath)
                }
            })
            res.json({
                response: response.data
            })
        } catch (error) {
            res.json({
                error: error.message
            })
        }
    }
}

module.exports = new AppControllers