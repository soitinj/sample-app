import { Button, ButtonGroup, Card } from 'react-bootstrap'
import moment from 'moment'
import commentService from '../services/comments'
import { useState } from 'react'

const Comment = ({ comment }) => {

  const [likes, setLikes] = useState(comment.likes)

  const rateComment = async (like) => {
    try {
      await commentService.rate(comment.id, comment.blog, like)
      const updatedLikes = likes + (like ? 1 : -1)
      setLikes(updatedLikes)
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <Card className='mt-2 mb-2 border rounded'>
      <Card.Body>
        <Card.Title as='h6'>{comment.user.username}</Card.Title>
        <Card.Text>{comment.comment}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted d-flex align-items-center'>
        {moment(comment.posted).fromNow()}
        <div className='ms-auto d-flex align-items-center'>
          <span className='fw-bold'>{ likes ? likes : 0 }&nbsp;</span>
          <ButtonGroup>
            <Button onClick={() => rateComment(true)} variant='outline-success'>like</Button>
            <Button onClick={() => rateComment(false)} variant='outline-danger'>dislike</Button>
          </ButtonGroup>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default Comment