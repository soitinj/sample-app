import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import moment from 'moment';

const Blog = ({ setNotification, updateBlogs, blog }) => {
  const [toggleInfo, setToggleInfo] = useState(false)
  const [ButtonLabel, setButtonLabel] = useState('view')
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
    <Card style={{ width: '18rem' }} className='border border-secondary rounded info'>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className='text-muted'>{blog.author}</Card.Subtitle>
        {toggleInfo && (
          <Card.Text as='div'>
            <div>likes: {likes} <Button variant='success' onClick={likeBlog}>like 👍</Button></div>
            <div>added by: {blog.user.name}</div>
            <a href={blog.url}>{blog.url}</a>
            <div><Button variant='danger' onClick={deleteBlog}>remove</Button></div>
          </Card.Text>
        )}
      </Card.Body>
      <Card.Footer>
        <Button onClick={toggleBlogInfo}>{ButtonLabel}</Button>
        <small className='p-2 text-muted'>Added {moment(blog.added).fromNow()}</small>
      </Card.Footer>
    </Card>
  )
}

Blog.propTypes = {
  setNotification: PropTypes.func.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog