import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ setNotification, updateBlogs, blog }) => {
  const [toggleInfo, setToggleInfo] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')
  const [likes, setLikes] = useState(blog.likes)

  const toggleBlogInfo = () => {
    setButtonLabel(toggleInfo ? 'view' : 'hide')
    setToggleInfo(!toggleInfo)
  }

  const likeBlog = async () => {
    try {
      await blogService.like(blog.id)
      setLikes(likes + 1)
    } catch (e) {
      setNotification({ message: e.response.data.error || e.response.status, success: false })
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        await updateBlogs()
        setNotification({ message: `Deleted blog ${blog.title} by ${blog.author}.`, success: true })
      } catch (e) {
        if (e.response.status === 401) {
          setNotification({ message: '401 Unauthorized. (You are not the owner of that blog!)', success: false })
        } else {
          setNotification({ message: e.response.data.error || e.response.status, success: false })
        }
      }
    }
  }

  return (
    <div className='blog'>
      <div>{blog.title}, {blog.author} <button onClick={toggleBlogInfo}>{buttonLabel}</button></div>
      {toggleInfo && (
        <>
          <div>likes: {likes} <button onClick={likeBlog}>like 👍</button></div>
          <div>added by: {blog.user.name}</div>
          <a>{blog.url}</a>
          <div><button onClick={deleteBlog}>remove</button></div>
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  setNotification: PropTypes.func.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog