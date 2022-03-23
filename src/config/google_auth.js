const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config()

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET_KEY,
  process.env.GOOGLE_REDIRECT_URL
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

module.exports = {
  oauth2Client,
  scopes
}