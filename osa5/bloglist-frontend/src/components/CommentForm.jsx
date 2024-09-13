import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import commentService from '../services/comments'

const CommentForm = ({ blog, updateComments, setNotification }) => {
  const [comment, setComment] = useState('')

  const postComment = async (event) => {
    event.preventDefault()
    try {
      await commentService.create({ comment: comment }, blog.id)
      setNotification({ message: 'Comment added.', success: true })
      setComment('')
      await updateComments()
    } catch (e) {
      setNotification({ message: e.response.data.error, success: false })
    }
  }

  return (
    <Form onSubmit={postComment}>
      <Form.Group className='mt-2 mb-2' controlId='commentForm.comment'>
        <Form.Control
          type='text'
          as='textarea'
          placeholder='write your comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Button type='submit'>post comment</Button>
    </Form>
  )
}

export default CommentForm