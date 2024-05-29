import { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import BlogList from './BlogList'
import Header from './Header'
import LoginHeader from './LoginHeader'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogView = ({ user, setNotification, setUser }) => {

  const [blogs, setBlogs] = useState([])
  const blogCreateRef = useRef()

  const updateBlogs = useCallback(async () => {
    try {
      const bs = await blogService.getAll()
      setBlogs(bs)
    } catch (e) {
      setNotification({ message: e.response.data.error || e.response.status, success: false })
    }
  }, [setBlogs, setNotification])

  useEffect(() => {
    const fetchData = async () => {
      await updateBlogs()
    }
    fetchData()
  }, [updateBlogs])

  return (
    <div>
      <Header text={'blogs'}></Header>
      <LoginHeader user={user} setUser={setUser}></LoginHeader>
      <Togglable buttonLabel='create new blog' ref={blogCreateRef}>
        <BlogForm updateBlogs={updateBlogs} hideForm={() => blogCreateRef.current.toggleVisibility()} setNotification={setNotification}></BlogForm>
      </Togglable>
      <br></br>
      <BlogList setNotification={setNotification} updateBlogs={updateBlogs} blogs={blogs}></BlogList>
    </div>
  )
}

BlogView.propTypes = {
  user: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

export default BlogView