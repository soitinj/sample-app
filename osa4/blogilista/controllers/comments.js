const commentRouter = require('express').Router()
const Comment = require('../models/comment')

commentRouter.get('/:blogId', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.blogId })
    .populate('user', { username: 1, name: 1 })
  response.status(200).json(comments)
})
  
commentRouter.post('/', async (request, response) => {
  /*if (request.body.title === undefined) {
    response.status(400).json({ error: 'title not given' })
  }*/
  const newComment = { ...request.body, posted: new Date(), user: request.user.id }
  const comment = new Comment(newComment)
  result = await comment.save()
  response.status(201).json(result)
})

module.exports = commentRouter