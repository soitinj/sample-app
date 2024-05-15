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

describe('user tests', () => {

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

  test('creating user with no password returns 400', async () => {
    const user = {
      username: 'johndoe2',
      name: 'John D. Doe'
    }
    const response = await api.post('/api/users/')
      .send(user)
      .expect(400)

    assert.notStrictEqual(response.body.error, undefined)
  })

  test('creating user with short password returns 400', async () => {
    const user = {
      username: 'johndoe23',
      password: '12',
      name: 'John Short Password Doe'
    }
    const response = await api.post('/api/users/')
      .send(user)
      .expect(400)

    assert.notStrictEqual(response.body.error, undefined)
  })

  test('creating user with short username returns 400', async () => {
    const user = {
      username: 'jd',
      password: '123',
      name: 'John Short Username Doe'
    }
    const response = await api.post('/api/users/')
      .send(user)
      .expect(400)

    assert.notStrictEqual(response.body.error, undefined)
  })

  test('duplicate users cannot be created', async() => {
    const user = {
      username: 'johndoe2',
      password: '123',
      name: 'John D. Doe'
    }
    await api.post('/api/users/')
      .send(user)
      .expect(201)

    await api.post('/api/users/')
      .send(user)
      .expect(409)
  })

  test('viewing users is possible', async() => {
    const response = await api.get('/api/users/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const user = response.body.find(user => user.name === 'Anna Delvey')
    assert.notStrictEqual(user, undefined)
    assert.strictEqual(user.username, 'adelvey')
  })

  test('login is possible', async() => {
    await api.post('/api/login/')
      .send({username: 'adelvey', password: '123'})
      .expect(200)
  })

  after(async () => {
    await mongoose.connection.close()
  })

})
