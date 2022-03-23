const { google } = require("googleapis");
const { oauth2Client, scopes } = require("../config/google_auth");

const oauth2 = google.oauth2("v2");

function getConnectionUrl() {
  const url = oauth2Client.generateAuthUrl({
    scope: scopes
  })
  return url
}

async function getGoogleTokens(code) {
  try {
    const { tokens } = await oauth2Client.getToken(code)
    return tokens
  }catch(e) {
    console.log(e)
    throw e
  }
}

async function getUserDetails(tokens){
  oauth2Client.setCredentials(tokens);
  try{
    const userInfo = await oauth2.userinfo.get({auth: oauth2Client});
    return userInfo.data;
  }catch(e){
    console.log(e)
    throw e;
  }
}

module.exports = {
  getGoogleTokens,
  getUserDetails,
  getConnectionUrl
}