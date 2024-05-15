const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
//const Blog = require('../models/blog')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (String(password).length < 3 || !(password)) {
    return response.status(400).json({ error: 'Password must be of length 3 or greater' })
  }
  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.get('/', async (_request, response) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.status(200).json(users)
})

module.exports = userRouter