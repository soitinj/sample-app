import { useState } from 'react'
import Header from './Header'
import blogService from '../services/blogs'
import Button from 'react-bootstrap/Button';

const BlogForm = ({ updateBlogs, hideForm, setNotification }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await blogService.create({ title, author, url })
      setNotification({ message: `Blog ${title} by ${author} created.`, success: true })
      hideForm()
      await updateBlogs()
    } catch (e) {
      setNotification({ message: e.response.data.error, success: false })
    }
  }

  return (
    <div>
      <Header text='create new blog'></Header>
      <form method='post' onSubmit={handleCreate}>
        <div>
          <label className='create-label'>title:</label>
          <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div>
          <label className='create-label'>url:</label>
          <input type="url" name="url" onChange={(e) => setUrl(e.target.value)}></input>
        </div>
        <div>
          <label className='create-label'>author:</label>
          <input type="text" name="author" onChange={(e) => setAuthor(e.target.value)}></input>
        </div>
        <Button variant='success' type="submit" value="Submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm