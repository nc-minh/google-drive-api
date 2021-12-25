require('dotenv').config()


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

module.exports = driver