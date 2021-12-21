require('dotenv').config()
const path = require('path')
const fs = require('fs')

const {google} = require('googleapis')

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT = process.env.REDIRECT
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

const driver = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'sanyeee.jpg')

async function uploadFile(){
    try {
        const response = await driver.files.create({
            requestBody:{
                name: 'api_testing',
                mimeType: 'image/ipg'
            },
            media:{
                mimeType: 'image/ipg',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response.data)

    } catch (error) {
        console.log(error.message)
    }
}

// uploadFile()

//delete
async function deleteFile(){
    try {
        const response = await driver.files.delete({
            fileId: '1Yg692FyytyQuS12c4LrvsQaijRVkEY63'
        })
        console.log(response.data, response.status)
    } catch (error) {
        console.log(error.message)
    }
}

// deleteFile()


//public
async function generatePublicUrl(){
    try {
        const fileId = '1Xixl26g7tvVuOFlti-HcvTgPXnM0uvWe'
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
    } catch (error) {
        console.log(error.message)
    }
}

generatePublicUrl()