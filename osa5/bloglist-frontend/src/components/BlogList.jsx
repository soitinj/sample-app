import Blog from './Blog'
import PropTypes from 'prop-types'
import { chunkArray } from '../libs/util'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useMemo, useState } from 'react'

const getImageSrc = (blog) => {
  switch (blog.linkType) {
    case 'img':
      return blog.url
    case 'text':
      return '/rat.png'
    default:
      return '/rat2.jpg'
  }
}

const BlogList = ({ setNotification, blogs }) => {
  const [pageNumber, setPageNumber] = useState(0)
  const chunks = useMemo(() => {
    const sortedBlogs = [...blogs].sort((a, b) => (b.likes - a.likes))
    return chunkArray(sortedBlogs)
  }, [blogs])

  return (
    <>
      <div className='d-flex flex-wrap gap-1'>
        {chunks.length > 0 && chunks[pageNumber].map(blog =>
          <Blog setNotification={setNotification} key={blog.id} blog={blog} imageSrc={getImageSrc(blog)} />
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
  blogs: PropTypes.array.isRequired
}

export default BlogList