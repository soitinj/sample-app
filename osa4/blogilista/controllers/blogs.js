const blogsRouter = require('express').Router()
const sharp = require('sharp')
const { default: axios } = require('axios')
const Blog = require('../models/blog')
const Thumbnail = require('../models/thumbnail')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('thumbnail', { imgData: 1 })
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  /*if (request.body.title === undefined) {
    response.status(400).json({ error: 'title not given' })
  }*/
  const newBlog = { ...request.body, added: new Date(), likes: 0, user: request.user.id }
  const blog = new Blog(newBlog)
  result = await blog.save()
  if (request.body.linkType === 'img') {
    // create thumbnail
    const imgfetch = await axios.get(request.body.url, { responseType: 'arraybuffer' })
    const resizedImg = await sharp(imgfetch.data)
      .resize(100, 100, { fit: 'contain', position: 'center' })
    const img = new Thumbnail({ imgData: resizedImg.toString('base64') })
    imgResult = await img.save()
  }
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  // Should check existence of token before this...
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    if (request.user && blog.user.toString() === request.user.id.toString()) {
      result = await Blog.deleteOne({ _id: request.params.id })
      return response.status(204).end()
    }
    return response.status(401).json({ 'error': 'Unauthorized' })
  }
  return response.status(404).json({ 'error': 'Not found' })
  //.then(blog => response.status(204).end())
  //.catch(error => next(error))
})

blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: request.user.id
    },
    { new: true, runValidators: true, context: 'query' }
  )
  response.status(204).end()
})

blogsRouter.post('/:id/like', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, { $inc: { likes: 1 } }, { new: true, runValidators: true, context: 'query' })
  response.status(204).end()
})

module.exports = blogsRouter