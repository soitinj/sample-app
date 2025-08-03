const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })

  if (user && await bcrypt.compare(password, user.passwordHash)) {
    //console.log(`USER ID: ${user.id}`)
    const userForToken = {
      username: user.username,
      id: user.id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    return response
      .status(200)
      .send({ token: token, username: user.username, name: user.name, joined: user.joined })
  }

  return response.status(401).json({ error: 'Invalid username or password' })
})

module.exports = loginRouter