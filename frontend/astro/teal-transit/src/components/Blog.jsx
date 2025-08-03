import { useState } from 'react'
import PropTypes from 'prop-types'
import commentService from '../services/comments'
import { Card, Button, ListGroup } from 'react-bootstrap'
import CommentView from './CommentView'
import moment from 'moment'
import { motion, AnimatePresence } from 'framer-motion'
import blogActions from '../nanostores/blogStore'
import { userStore } from '../nanostores/userStore'
import { useStore } from '@nanostores/react'

const Blog = ({ setNotification, blog, imageSrc }) => {
  const [toggleInfo, setToggleInfo] = useState(false)
  const [commentsShow, setCommentsShow] = useState(false)
  const [ButtonLabel, setButtonLabel] = useState('view')
  const [comments, setComments] = useState([])

  const $user = useStore(userStore)

  const toggleBlogInfo = () => {
    setButtonLabel(toggleInfo ? 'view' : 'hide')
    setToggleInfo(!toggleInfo)
  }

  const rateBlog = async () => {
    try {
      blogActions.likeBlog(blog)
    } catch (e) {
      setNotification({ message: e.response.data.error || e.response.status, success: false })
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      try {
        blogActions.removeBlog(blog)
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
    <Card style={{ width: '19rem', height: '100%' }} className='border border-secondary rounded info'>
      <img src={imageSrc} loading='lazy' decoding='async' style={{ objectFit: 'contain', objectPosition: 'left', maxHeight: '4rem' }}></img>
      <Card.Title style={{ minHeight: '3rem' }}>{blog.title}</Card.Title>
      <Card.Subtitle className='text-muted'>{blog.user.username}</Card.Subtitle>
      <AnimatePresence>
        {toggleInfo && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            { blog.text &&
              <Card.Body className='border-top bg-light'>
                <Card.Text>{blog.text}</Card.Text>
              </Card.Body>
            }
            <ListGroup className='border-top' variant='flush'>
              <ListGroup.Item>
                added by: {blog.user.name}
              </ListGroup.Item>
              { blog.author && 
                <ListGroup.Item>
                  Original author: {blog.author}
                </ListGroup.Item>
              }
              {blog.url &&
                <ListGroup.Item>
                  <Card.Link href={blog.url}>{blog.url}</Card.Link>
                </ListGroup.Item>
              }
              <ListGroup.Item>
                <div>
                  <Button className='mb-1' variant='success' onClick={rateBlog}>like 👍</Button> likes: {blog.likes}
                </div>
                <div>
                  <Button className='mb-1' variant='primary' onClick={viewComments}>view comments</Button>
                </div>
                <div>
                  {blog.user.username === $user.username &&
                    <Button variant='danger' onClick={deleteBlog}>remove</Button>
                  }
                </div>
              </ListGroup.Item>
            </ListGroup>
          </motion.div>
        )}
      </AnimatePresence>
      <Card.Footer style={{ backgroundColor: '#e0ffff' }}>
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
  blog: PropTypes.object.isRequired
}

export default Blog