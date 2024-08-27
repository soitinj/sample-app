import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ setNotification, updateBlogs, blogs }) => {
  return (
    <div className='d-flex flex-wrap'>
      {[...blogs].sort((a, b) => (b.likes - a.likes)).map(blog =>
        <Blog setNotification={setNotification} updateBlogs={updateBlogs} key={blog.id} blog={blog} />
      )}
    </div>
  )
}

BlogList.propTypes = {
  setNotification: PropTypes.func.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired
}

export default BlogList