import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map(s => s.id === action.payload.id ? action.payload : s)
    },
    setBlogs(_state, action) {
      return action.payload
    }
  }
})

export const { addBlog, updateBlog, setBlogs } = blogSlice.actions

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    await blogService.create({ ...content })
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.like(blog.id)
    dispatch(updateBlog(updatedBlog.data))
  }
}

export default blogSlice.reducer