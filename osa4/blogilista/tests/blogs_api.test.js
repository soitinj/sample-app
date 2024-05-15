const { test, after, before, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let testuser1
let testuser2
let testBlogId

describe('blog tests', () => {

  before(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    
    await api.post('/api/users/')
      .send({ username: 'jdoe', name: 'John Doe', password: '123' })
    await api.post('/api/users/')
      .send({ username: 'adelvey', name: 'Anna Delvey', password: '123' })

    const loginRequest1 = await api.post('/api/login')
      .send({ username: 'jdoe', password: '123' })
    const loginRequest2 = await api.post('/api/login')
      .send({ username: 'adelvey', password: '123' })

    testuser1 = loginRequest1.body
    testuser2 = loginRequest2.body

    const promiseArray = helper.initialBlogs.map(async blog => (
      await api.post('/api/blogs/')
        .set({ 'Authorization': `Bearer ${testuser1.token}` })
        .send(blog)
    ))
    await Promise.all(promiseArray)
  
    const response = await api.post(`/api/blogs/`)
      .set({ 'Authorization': `Bearer ${testuser1.token}` })
      .send(helper.testBlog)
    testBlogId = response.body.id
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
      .set({ 'Authorization': `Bearer ${testuser2.token}` })
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
      .set({ 'Authorization': `Bearer ${testuser2.token}` })
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
      .set({ 'Authorization': `Bearer ${testuser2.token}` })
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
      .set({ 'Authorization': `Bearer ${testuser2.token}` })
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
      .set({ 'Authorization': `Bearer ${testuser2.token}` })
      .send(blogToBeDeleted)
      .expect(201)

    const response = await api.get('/api/blogs/')
      .expect(200)
    const blogId = response.body.find(b => b.title === 'deleted blog').id
    await api.delete(`/api/blogs/${blogId}`)
      .set({ 'Authorization': `Bearer ${testuser2.token}` })
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
      .set({ 'Authorization': `Bearer ${testuser2.token}` })
      .send({ likes: oldLikes + 1})
      .expect(204)
    const newResponse = await api.get('/api/blogs/')
      .expect(200)
    const updatedBlog = newResponse.body.find(b => b.title === 'React patterns')
    assert.strictEqual(updatedBlog.likes, oldLikes + 1)
  })

  test('deleting without login token returns 401', async () => {
    await api.delete(`/api/blogs/${testBlogId}`)
      .expect(401)
  })

  test('deleting with invalid login token returns 401', async () => {
    await api.delete(`/api/blogs/${testBlogId}`)
      .set({'Authorization': `Bearer ${testuser2.token}` })
      .expect(401)
  })

  after(async () => {
    await mongoose.connection.close()
  })

})
