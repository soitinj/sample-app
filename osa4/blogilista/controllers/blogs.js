const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  /*if (request.body.title === undefined) {
    response.status(400).json({ error: 'title not given' })
  }*/
  const newBlog = {...request.body, likes: request.body.likes || 0}
  const blog = new Blog(newBlog)
  result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
  //.then(blog => response.status(204).end())
  //.catch(error => next(error))
})

blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes }, { new: true, runValidators: true, context: 'query' })
  response.status(204).end()
})

module.exports = blogsRouter