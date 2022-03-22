import { google } from "googleapis";
import dotenv from "dotenv"

dotenv.config()

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET_KEY,
  process.env.GOOGLE_REDIRECT_URL
);

export const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]