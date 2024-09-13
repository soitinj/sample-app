import { Card } from 'react-bootstrap'
import moment from 'moment'

const Comment = ({ comment }) => {

  return (
    <Card className='mt-2 mb-2 border rounded'>
      <Card.Body>
        <Card.Title as='h6'>{comment.user.username}</Card.Title>
        <Card.Text>{comment.comment}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{moment(comment.posted).fromNow()}</Card.Footer>
    </Card>
  )
}

export default Comment