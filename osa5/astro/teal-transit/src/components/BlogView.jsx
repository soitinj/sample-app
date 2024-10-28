import { useRef } from 'react'
import PropTypes from 'prop-types'
import BlogList from './BlogList'
import Header from './Header'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import IGFeed from './IGFeed'

const BlogView = ({ user, header, setNotification, blogs, updateBlogs, igFeed }) => {
  const blogCreateRef = useRef()

  return (
    <div className='container m-0'>
      <div className='row m-0 p-0'>
        <div className='col-md-9'>
          <Header text={header}></Header>
          <Togglable buttonVariant='success' buttonLabel='create new blog' ref={blogCreateRef}>
            <BlogForm updateBlogs={updateBlogs} hideForm={() => blogCreateRef.current.toggleVisibility()} setNotification={setNotification}></BlogForm>
          </Togglable>
          <BlogList user={user} setNotification={setNotification} updateBlogs={updateBlogs} blogs={blogs}></BlogList>
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