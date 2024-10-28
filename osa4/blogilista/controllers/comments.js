const commentRouter = require('express').Router()
const Comment = require('../models/comment')

commentRouter.get('/:blogId', async (request, response) => {
  const comments = await Comment.find({ blog: request.params.blogId })
    .populate('user', { username: 1, name: 1 })
  response.status(200).json(comments)
})
  
commentRouter.post('/:blogId', async (request, response) => {
  const newComment = { ...request.body, posted: new Date(), user: request.user.id, blog: request.params.blogId }
  const comment = new Comment(newComment)
  result = await comment.save()
  response.status(201).json(result)
})

commentRouter.post('/:blogId/:commentId/like', async (request, response) => {
  await Comment.findByIdAndUpdate(request.params.commentId, { $inc: { likes: 1 } })
  response.status(204).end()
})

module.exports = commentRouter