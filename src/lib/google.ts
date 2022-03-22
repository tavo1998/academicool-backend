import { google } from "googleapis";
import { Credentials } from "google-auth-library"
import { oauth2Client, scopes } from "./../config/google_auth"

const oauth2 = google.oauth2("v2");

export function getConnectionUrl() {
  const url = oauth2Client.generateAuthUrl({
    scope: scopes
  })
  return url
}

export async function getGoogleTokens(code: string) {
  try {
    const { tokens } = await oauth2Client.getToken(code)
    return tokens
  }catch(e) {
    console.log(e)
    throw e
  }
}

export async function getUserDetails(tokens: Credentials){
  oauth2Client.setCredentials(tokens);
  try{
    const userInfo = await oauth2.userinfo.get({auth: oauth2Client});
    return userInfo.data;
  }catch(e){
    console.log(e)
    throw e;
  }
}