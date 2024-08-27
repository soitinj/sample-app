import { useRef } from 'react'
import PropTypes from 'prop-types'
import BlogList from './BlogList'
import Header from './Header'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogView = ({ setNotification, blogs, updateBlogs }) => {
  const blogCreateRef = useRef()

  return (
    <div>
      <Header text={'blogs'}></Header>
      <Togglable buttonVariant='success' buttonLabel='create new blog' ref={blogCreateRef}>
        <BlogForm updateBlogs={updateBlogs} hideForm={() => blogCreateRef.current.toggleVisibility()} setNotification={setNotification}></BlogForm>
      </Togglable>
      <br></br>
      <BlogList setNotification={setNotification} updateBlogs={updateBlogs} blogs={blogs}></BlogList>
    </div>
  )
}

BlogView.propTypes = {
  setNotification: PropTypes.func.isRequired,
}

export default BlogView