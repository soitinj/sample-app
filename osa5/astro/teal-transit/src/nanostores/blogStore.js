import { atom } from 'nanostores'
import blogService from '../services/blogs'

// Create the store
export const blogStore = atom([])

// Action creators
export const setBlogs = (blogs) => {
  blogStore.set(blogs)
}

export const updateBlog = (updatedBlog) => {
  blogStore.set(blogStore.get().map(blog => 
    blog.id === updatedBlog.id ? updatedBlog : blog
  ))
}

// Async actions
export const getBlogs = async () => {
  const blogs = await blogService.getAll()
  setBlogs(blogs)
}

export const createBlog = async (content) => {
  await blogService.create({ ...content })
  await getBlogs()
}

export const removeBlog = async (blog) => {
  await blogService.remove(blog.id)
  await getBlogs()
}

export const likeBlog = async (blog) => {
  const response = await blogService.like(blog.id)
  updateBlog(response.data)
}

export default { getBlogs, createBlog, removeBlog, likeBlog }