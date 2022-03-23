function createOptionsCookie(minutes) {
  return {
    httpOnly: true,
    expires: new Date(Date.now() + (minutes * 60000))
  }
}

module.exports = {
  createOptionsCookie
}