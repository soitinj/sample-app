import { Card } from "react-bootstrap"
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
          <Card.Text>Most popular blog: <small className='text-muted'>{ `${sortedByLikes[0].title} (${sortedByLikes[0].likes} likes)` }</small></Card.Text>
          <Card.Text>Newest blog: <small className='text-muted'>{ `${sortedByDate[0].title} (Added ${moment(sortedByLikes[0].added).fromNow()}.)` }</small></Card.Text>
          <Card.Text>Oldest blog: <small className='text-muted'>{ `${sortedByDate[sortedByDate.length - 1].title} (Added ${moment(sortedByDate[sortedByDate.length - 1].added).fromNow()}.)` }</small></Card.Text>
        </Card>
        <Card className='w-25 m-3'>
          <Card.Title>Personal stats</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{ user.name }</Card.Subtitle>
          <Card.Text>Most popular blog: <small className='text-muted'>{ userBlogs.sort((a, b) => (b.likes - a.likes))[0].title }</small></Card.Text>
          <Card.Text>Blogs created: <small className='text-muted'>{ userBlogs.length }</small></Card.Text>
          <Card.Text>Total blog likes: <small className='text-muted'>{ userBlogs.reduce((acc, blog) => acc + blog.likes, 0) }</small></Card.Text>
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