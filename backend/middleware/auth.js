const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({
      error: 'No token provided'
    })
  }

  const parts = authorization.split(' ')
  const token = parts[1]

  if (parts[0] !== 'Bearer' || !token) {
    return res.status(401).json({
      error: 'Invalid token format'
    })
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid or expired token'
    })
  }
}

module.exports = auth