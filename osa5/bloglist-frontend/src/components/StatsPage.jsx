import { Card, ListGroup } from "react-bootstrap"
import moment from 'moment';

const StatsPage = ({ user, blogs }) => {
  const sortedByLikes = [...blogs].sort((a, b) => (b.likes - a.likes))
  const sortedByDate = [...blogs].sort((a, b) => (a > b) ? 1 : -1)
  const userBlogs = [...blogs].filter(blog => blog.user.username === user.username)

  const cards = () => {
    return (
      <>
        <Card className='w-25 m-3'>
          <Card.Title>Site stats</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Most popular blog: <small className='text-muted'>{ `${sortedByLikes[0].title} (${sortedByLikes[0].likes} likes)` }</small></ListGroup.Item>
            <ListGroup.Item>Newest blog: <small className='text-muted'>{ `${sortedByDate[0].title} (Added ${moment(sortedByDate[0].added).fromNow()}.)` }</small></ListGroup.Item>
            <ListGroup.Item>Oldest blog: <small className='text-muted'>{ `${sortedByDate[sortedByDate.length - 1].title} (Added ${moment(sortedByDate[sortedByDate.length - 1].added).fromNow()}.)` }</small></ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className='w-25 m-3'>
          <Card.Title>Personal stats</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{ user.name }</Card.Subtitle>
          <Card.Body className='p-0 d-flex flex-column'>
            { (userBlogs.length &&
            <ListGroup className="list-group-flush border-top">
              <ListGroup.Item>Most popular blog: <small className='text-muted'>{ userBlogs.sort((a, b) => (b.likes - a.likes))[0].title }</small></ListGroup.Item>
              <ListGroup.Item>Blogs created: <small className='text-muted'>{ userBlogs.length }</small></ListGroup.Item>
              <ListGroup.Item>Total blog likes: <small className='text-muted'>{ userBlogs.reduce((acc, blog) => acc + blog.likes, 0) }</small></ListGroup.Item>
            </ListGroup>
            ) || <Card.Text>No blogs created yet.</Card.Text>}
          </Card.Body>
          <Card.Footer>Joined <small className='text-muted'>{ new Date(user.joined).toDateString() }</small></Card.Footer>
        </Card>
      </>
    )
  }

  return (
    <div className='d-flex flex-wrap'>
      { blogs.length && cards() }
    </div>
  )
}

export default StatsPage