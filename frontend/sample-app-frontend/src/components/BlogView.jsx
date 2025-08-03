import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import BlogList from './BlogList'
import Header from './Header'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import IGFeed from './IGFeed'
import SimpleTextFilter from './SimpleTextFilter'
import { useSelector } from 'react-redux'

const BlogView = ({ header, setNotification, byUser, igFeed }) => {
  const blogs = useSelector(({ blogs, user }) => {
    return byUser ? blogs.filter(blog => blog.user.username === user?.username) : blogs
  })
  const blogCreateRef = useRef()
  const [filteredBlogs, setFilteredBlogs] = useState(null)

  return (
    <div className='container m-0'>
      <div className='row m-0 p-0'>
        <div className='col-md-9'>
          <Header text={header}></Header>
          <Togglable buttonVariant='success' buttonLabel='create new blog' ref={blogCreateRef}>
            <BlogForm hideForm={() => blogCreateRef.current.toggleVisibility()} setNotification={setNotification}></BlogForm>
          </Togglable>
          <SimpleTextFilter data={blogs} setData={setFilteredBlogs} filterLabel='blogs' filterField='title'></SimpleTextFilter>
          <BlogList setNotification={setNotification} blogs={filteredBlogs || blogs}></BlogList>
        </div>
        {igFeed?.postIds && (
          <div className='col-md-3'>
            <h3>Very Important Feed</h3>
            <IGFeed postIds={igFeed.postIds}></IGFeed>
          </div>
        )}
      </div>
    </div>
  )
}

BlogView.propTypes = {
  setNotification: PropTypes.func.isRequired,
}

export default BlogView