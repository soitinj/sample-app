import Comment from './Comment'
import CommentForm from './CommentForm'
import { Modal, Button } from 'react-bootstrap'

const CommentView = ({ show, setShow, comments, blog, updateComments, setNotification }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Comments on {blog.title} ({blog.likes} likes)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(comments.length > 0 && [...comments].sort((a, b) => (a.posted > b.posted) ? -1 : 1).map(c =>
          <Comment comment={c} key={c.id} />
        )) || <div className='mb-3'>no comments yet...</div>
        }
        <CommentForm blog={blog} updateComments={updateComments} setNotification={setNotification}></CommentForm>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CommentView