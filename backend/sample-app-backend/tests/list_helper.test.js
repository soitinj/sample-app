const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const listWithNoBlogs = []
  
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('total likes', () => {
  
  test('when list has only one blog, return the likes of that blog', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })


  test('when list has no blogs, return 0', () => {
    assert.strictEqual(listHelper.totalLikes(listWithNoBlogs), 0)
  })

  test('when list has many blogs, return the combined likes', () => {
    assert.strictEqual(listHelper.totalLikes(listWithManyBlogs), 36)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, result is that blog', () => {
    assert.strictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
  })

  test('when list has no blogs, result is undefined', () => {
    assert.strictEqual(listHelper.favoriteBlog(listWithNoBlogs), undefined)
  })

  test('when list has many blogs, result is the blog with most likes', () => {
    assert.strictEqual(listHelper.favoriteBlog(listWithManyBlogs), listWithManyBlogs[2])
  })
})

describe('most blogs', () => {
  test('when list has many blogs, return author with most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithManyBlogs), { author: 'Robert C. Martin', blogs: 3 })
  })

  test('when list has only one blog, return the author of the only blog', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), { author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('when list has no blogs, return undefined', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithNoBlogs), undefined)
  })
})

describe('most likes', () => {
  test('when list has many blogs, return object with best author and likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithManyBlogs), { author: 'Edsger W. Dijkstra', likes: 17 })
  })

  test('when list has only one blog, return object with that author and likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), { author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('when list has no blogs, return undefined', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithNoBlogs), undefined)
  })
})