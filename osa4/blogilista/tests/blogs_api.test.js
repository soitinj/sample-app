const { test, after, before, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('things', () => {

  before(async () => {
    await Blog.deleteMany({})

    const promiseArray = helper.initialBlogs.map(async blog => await new Blog(blog).save())
    await Promise.all(promiseArray)
    /* does not work: async in forEach

    helper.initialBlogs.forEach(async (blog) => {
      const blogObject = new Blog(blog)
      await blogObject.save()
    })*/
  
    console.log(`Initial blogs saved.`)
  })
  
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('blog id field is called "id"', async () => {
    const response = await api.get('/api/blogs/')
      .expect(200)
  
    response.body.forEach((blog) => {
      assert.strictEqual(!('_id' in blog), true)
      assert.strictEqual('id' in blog, true)
    })
  })

  test('blogs can be added', async () => {
    const preResponse = await api.get('/api/blogs/')
      .expect(200)

    const newBlog = {
      'title': 'yle uutiset',
      'author': 'yle',
      'url': 'https://yle.fi',
      'likes': 100
    }
    await api.post('/api/blogs/')
      .send(newBlog)
      .expect(201)

    const postResponse = await api.get('/api/blogs/')
      .expect(200)
    assert.strictEqual(preResponse.body.length + 1, postResponse.body.length)
  })

  test('likes 0 if not given', async () => {
    const newBlog = {
      'title': 'another blog',
      'author': 'blogmaker',
      'url': 'blogspot.com'
    }

    await api.post('/api/blogs/')
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs/')
      .expect(200)

    assert.strictEqual(0, response.body.find(b => b.title === 'another blog').likes)
  })

  test('return 400 if url not given', async () => {
    const newBlog = {
      'title': 'no url blog',
      'author': 'blogmaker',
      'likes': 2
    }

    await api.post('/api/blogs/')
      .send(newBlog)
      .expect(400)
  })

  test('return 400 if title not given', async () => {
    const newBlog = {
      'url': 'https://blog.com',
      'author': 'blogmaker',
      'likes': 1
    }
    await api.post('/api/blogs/')
      .send(newBlog)
      .expect(400)
  })

  test('deleting a blog is possible', async () => {
    const blogToBeDeleted = {
      'title': 'deleted blog',
      'url': 'https://deletedblog.com',
      'author': 'blogmaker',
      'likes': 1
    }
    await api.post('/api/blogs/')
      .send(blogToBeDeleted)
      .expect(201)

    const response = await api.get('/api/blogs/')
      .expect(200)
    const blogId = response.body.find(b => b.title === 'deleted blog').id
    await api.delete(`/api/blogs/${blogId}`)
      .expect(204)

    const newResponse = await api.get('/api/blogs/')
      .expect(200)
    assert.strictEqual(newResponse.body.find(b => b.title === 'deleted blog'), undefined)
  })

  test('updating likes of a blog is possible', async () => {
    const response = await api.get('/api/blogs/')
      .expect(200)
    const originalBlog = response.body.find(b => b.title === 'React patterns')
    const oldLikes = originalBlog.likes
    const blogId = originalBlog.id
    await api.put(`/api/blogs/${blogId}`)
      .send({ likes: oldLikes + 1})
      .expect(204)
    const newResponse = await api.get('/api/blogs/')
      .expect(200)
    const updatedBlog = newResponse.body.find(b => b.title === 'React patterns')
    assert.strictEqual(updatedBlog.likes, oldLikes + 1)
  })

  after(async () => {
    await mongoose.connection.close()
  })

})
