const Blog = require('../models/blog')

const initialUsers = [
  {
    name: 'John Doe',
    username: 'johndoe',
    password: 'password'
  },
  {
    name: 'Mary Sue',
    username: 'marysue',
    password: 'password2'
  }
]

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
]

const testBlog = {
  title: 'test blog',
  author: 'test author',
  url: 'https://test.com',
  likes: 0
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

/*const nonExistingId = async () => {
  const note = new Blog({ title: 'non existing', author: 'none', url: 'https://google.com', likes: 0 })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}*/


module.exports = {
  initialBlogs, blogsInDb, testBlog
}