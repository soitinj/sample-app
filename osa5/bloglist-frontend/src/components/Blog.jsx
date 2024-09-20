import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import commentService from '../services/comments'
import { Card, Button } from 'react-bootstrap'
import CommentView from './CommentView'
import moment from 'moment'
import { motion, AnimatePresence } from 'framer-motion'

const Blog = ({ user, setNotification, updateBlogs, blog }) => {
  const [toggleInfo, setToggleInfo] = useState(false)
  const [commentsShow, setCommentsShow] = useState(false)
  const [ButtonLabel, setButtonLabel] = useState('view')
  const [likes, setLikes] = useState(blog.likes)
  const [comments, setComments] = useState([])

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

  const updateComments = async () => {
    const cs = await commentService.get(blog.id)
    setComments(cs)
  }

  const viewComments = async () => {
    try {
      await updateComments()
      setCommentsShow(true)
    } catch (e) {
      setNotification({ message: e.response.data.error || e.response.status, success: false })
    }
  }

  return (
    <Card style={{ width: '18rem' }} className='border border-secondary rounded info'>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className='text-muted'>{blog.author}</Card.Subtitle>
        <AnimatePresence>
          {toggleInfo && (
            <Card.Text as='div'>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                <div>likes: {likes} <Button variant='success' onClick={likeBlog}>like 👍</Button></div>
                <div>added by: {blog.user.name}</div>
                <a href={blog.url}>{blog.url}</a>
                <div><Button className='mb-1' variant='primary' onClick={viewComments}>view comments</Button></div>
                {blog.user.username === user.username &&
                  <div><Button variant='danger' onClick={deleteBlog}>remove</Button></div>
                }
              </motion.div>
            </Card.Text>
          )}
        </AnimatePresence>
      </Card.Body>
      <Card.Footer>
        <Button onClick={toggleBlogInfo}>{ButtonLabel}</Button>
        <small className='p-2 text-muted'>Added {moment(blog.added).fromNow()}</small>
      </Card.Footer>
      <CommentView
        show={commentsShow}
        setShow={setCommentsShow}
        comments={comments}
        blog={blog}
        setNotification={setNotification}
        updateComments={updateComments}
      />
    </Card>
  )
}

Blog.propTypes = {
  setNotification: PropTypes.func.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog