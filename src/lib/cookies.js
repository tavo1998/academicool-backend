function createOptionsCookie (minutes) {
  return {
    httpOnly: true,
    domain: '.gustavopinto.xyz',
    expires: new Date(Date.now() + (minutes * 60000))
  }
}

module.exports = {
  createOptionsCookie
}
