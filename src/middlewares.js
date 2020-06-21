const { authtokens, usuarios } = require('./models')

module.exports = async function (req, res, next) {
  const token = req.headers.authorization
  let expiration = {}
  let isValidToken = false

  if (token) {
    const isAuthorizedUser = await authtokens.findOne({
      attributes: ['createdAt', 'idusuario'],
      where: { token }
    })

    if (isAuthorizedUser) {
      isValidToken = true
    } else {
      isValidToken = false
    }
  }

  if (isValidToken) {
    req.authorized = true
  } else {
    req.authorized = false
  }

  next()
}
