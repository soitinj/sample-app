import { useState } from 'react'
import Header from './Header'
import blogService from '../services/blogs'

const BlogCreate = ({ setNotification }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await blogService.create({ title, author, url })
      setNotification({ message: `Blog ${title} by ${author} created!`, success: true })
    } catch (e) {
      setNotification({ message: e.response.data.error, success: false})
    }
  }

  return (
    <div>
      <Header text='create new blog'></Header>
      <form method='post' onSubmit={handleCreate}>
        <label>
          title:
          <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}></input>
        </label>
        <label>
          url:
          <input type="url" name="url" onChange={(e) => setUrl(e.target.value)}></input>
        </label>
        <label>
          author:
          <input type="text" name="author" onChange={(e) => setAuthor(e.target.value)}></input>
        </label>
        <button type="submit" value="Submit">create</button>
      </form>
    </div>
  )
}

export default BlogCreate