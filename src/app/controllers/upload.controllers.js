var driver = require('../middleware/connect')
const fs = require('fs')

class AppControllers {

    //[POST: /api/upload]
    async upload(req, res, next) {
        const file = req.files.file // req.files.file (".file" là lấy theo key gửi lên ở fetch)
        const filePath = `public/data/${file.name}`
        // save file vào thư mục data
        file.mv(filePath, (err) => {
            if (err)
                throw new Error("save fail")

            // upload lên driver
            const fileMetadata = {
                'name': file.name
            };
            const media = {
                mimeType: file.mimetype,
                body: fs.createReadStream(filePath) // đọc file từ đĩa
            };
            driver.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id'
            }, (err, file) => {
                if (err) {
                    // Handle error
                    console.error(err);
                    res.send('fail')
                } else {
                    console.log('File Id: ', file.data.id);
                    res.send('success')
                }
            });
        })
    }
}

module.exports = new AppControllers