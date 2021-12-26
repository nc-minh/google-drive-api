var driver = require('../middleware/connect')
const fs = require('fs')

class AppControllers {

    //[POST: /api/upload]
    async upload(req, res, next) {

        if (!req.files) {
            res.status(400).json({
                message: 'Upload failed - missing files',
                status: 'missing'
            })
        }

        try {
            const file = req.files.file // req.files.file (".file" là lấy theo key gửi lên ở fetch)
            const filePath = `public/data/${file.name}`
            // save file vào thư mục data
            await file.mv(filePath, (err) => {
                if (err)
                    throw new Error("save fail")

                // upload lên driver
                const fileMetadata = {
                    name: file.name
                }
                const media = {
                    mimeType: file.mimetype,
                    body: fs.createReadStream(filePath) // đọc file từ đĩa
                }
                driver.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id'
                }, async (err, file) => {
                    if (err) {
                        // Handle error
                        console.error(err);
                        res.status(500).json({
                            message: 'Upload failed'
                        })
                    } else {
                        console.log('File Id: ', file.data.id);
                        res.status(200).json({
                            message: 'Upload successfully!',
                            id: file.data.id
                        })

                        //xoa file
                        await fs.unlinkSync(filePath)
                    }
                });
            })
        } catch (error) {
            console.log(error.message)
        }


    }
}

module.exports = new AppControllers