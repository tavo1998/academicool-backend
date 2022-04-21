function createOptionsCookie (minutes) {
  return {
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN || 'localhost',
    expires: new Date(Date.now() + (minutes * 60000))
  }
}

module.exports = {
  createOptionsCookie
}
