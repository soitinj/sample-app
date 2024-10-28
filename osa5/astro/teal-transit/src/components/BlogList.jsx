import Blog from './Blog'
import PropTypes from 'prop-types'
import { chunkArray } from '../libs/util'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useState } from 'react'

const BlogList = ({ user, setNotification, updateBlogs, blogs }) => {
  const [pageNumber, setPageNumber] = useState(0)
  const sortedBlogs = [...blogs].sort((a, b) => (b.likes - a.likes))
  const chunks = chunkArray(sortedBlogs)

  return (
    <>
      <div className='d-flex flex-wrap gap-1'>
        {chunks.length > 0 && chunks[pageNumber].map(blog =>
          <Blog user={user} setNotification={setNotification} updateBlogs={updateBlogs} key={blog.id} blog={blog} />
        )}
      </div>
      <ButtonGroup>
        {Array.from({ length: Math.min(chunks.length, 10) }, (_, idx) => (
            <Button variant={pageNumber === idx ? 'primary' : 'outline-primary'} onClick={() => setPageNumber(idx)} key={idx}>{idx + 1}</Button>
          )
        )}
      </ButtonGroup>
    </>
  )
}

BlogList.propTypes = {
  setNotification: PropTypes.func.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired
}

export default BlogList