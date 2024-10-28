import { Card, ListGroup } from 'react-bootstrap'
import moment from 'moment'
import { useAnimationControls, motion } from 'framer-motion'
import { useEffect } from 'react'

const StatsPage = ({ user, blogs }) => {
  const sortedByLikes = [...blogs].sort((a, b) => (b.likes - a.likes))
  const sortedByDate = [...blogs].sort((a, b) => (a.added > b.added) ? -1 : 1)
  const userBlogs = [...blogs].filter(blog => blog.user.username === user.username)

  const controls = useAnimationControls()

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, duration: 0.5 },
    }))
  }, [])
  
  const cards = () => {
    return (
      <>
        <Card className='w-25 m-3'>
          <Card.Title className='ms-3'>Site stats</Card.Title>
          <Card.Subtitle className='ms-3 mb-2 text-muted'>Since 2024</Card.Subtitle>
          <ListGroup className='m-0 list-group-flush'>
            <ListGroup.Item>
              <motion.div animate={controls} custom={0} initial={{ opacity: 0, x: -50 }}>
                Most popular blog: <small className='text-muted'>{ `${sortedByLikes[0].title} (${sortedByLikes[0].likes} likes)` }</small>
              </motion.div>
            </ListGroup.Item>
            <ListGroup.Item>
              <motion.div animate={controls} custom={1} initial={{ opacity: 0, x: -50 }}>
                Newest blog: <small className='text-muted'>{ `${sortedByDate[0].title} (Added ${moment(sortedByDate[0].added).fromNow()}.)` }</small>
              </motion.div>
            </ListGroup.Item>
            <ListGroup.Item>
              <motion.div animate={controls} custom={2} initial={{ opacity: 0, x: -50 }}>
                Oldest blog: <small className='text-muted'>{ `${sortedByDate[sortedByDate.length - 1].title} (Added ${moment(sortedByDate[sortedByDate.length - 1].added).fromNow()}.)` }</small>
              </motion.div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className='w-25 m-3'>
          <Card.Title className='ms-3'>Personal stats</Card.Title>
          <Card.Subtitle className='ms-3 mb-2 text-muted'>{ user.name }</Card.Subtitle>
          <Card.Body className='p-0 d-flex flex-column'>
            { (userBlogs.length &&
              <ListGroup className='list-group-flush border-top'>
                <ListGroup.Item>
                  <motion.div animate={controls} custom={3} initial={{ opacity: 0, x: -50 }}>
                    Most popular blog: <small className='text-muted'>{ userBlogs.sort((a, b) => (b.likes - a.likes))[0].title }</small>
                  </motion.div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <motion.div animate={controls} custom={4} initial={{ opacity: 0, x: -50 }}>
                    Blogs created: <small className='text-muted'>{ userBlogs.length }</small>
                  </motion.div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <motion.div animate={controls} custom={5} initial={{ opacity: 0, x: -50 }}>
                  Total blog likes: <small className='text-muted'>{ userBlogs.reduce((acc, blog) => acc + blog.likes, 0) }</small>
                  </motion.div>
                </ListGroup.Item>
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