const _ = require('lodash')
const logging = require('./logger')

const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => blog.likes + acc, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined
  return blogs.reduce((acc, blog) => blog.likes > acc.likes ? blog : acc)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined
  const authorBlogsPairs = _.toPairs(_.groupBy(blogs, 'author'))
  const authorBlogsArray = authorBlogsPairs.map(pair => ({ 'author': pair[0], 'blogs': pair[1].length }))
  //logging.info(authorBlogsPairs)
  //logging.info(_.maxBy(authorBlogsArray, 'blogs'))
  return _.maxBy(authorBlogsArray, 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined
  const authorBlogsPairs = _.toPairs(_.groupBy(blogs, 'author'))
  const authorLikesArray = authorBlogsPairs.map(pair => ({ 'author': pair[0], 'likes': pair[1].reduce((acc, blog) => blog.likes + acc, 0) }))
  //logging.info('mostLikes CALLED')
  //logging.info(authorLikesArray)
  return _.maxBy(authorLikesArray, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}