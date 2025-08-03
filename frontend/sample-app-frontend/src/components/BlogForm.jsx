import { useState } from 'react'
import Header from './Header'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ hideForm, setNotification }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [linkType, setLinkType] = useState('text')
  const dispatch = useDispatch()

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      dispatch(createBlog({ title, author, url, linkType, text }))
      setNotification({ message: `Blog ${title} by ${author} created.`, success: true })
      hideForm()
    } catch (e) {
      setNotification({ message: e.response.data.error, success: false })
    }
  }

  return (
    <div>
      <Header text='create new blog'></Header>
      <form method='post' onSubmit={handleCreate}>
        <div>
          <label className='form-label'>title</label>
          <input placeholder='Title of the post' type="text" className='form-control' name="title" onChange={(e) => setTitle(e.target.value)}></input>
        </div>
        <div>
          <label className='form-label'>url</label>
          <input placeholder='Image or text link' type="url" className='form-control' name="url" onChange={(e) => setUrl(e.target.value)}></input>
        </div>
        <div>
          <label className='form-label'>author</label>
          <input placeholder='Original author (optional)' type="text" className='form-control' name="author" onChange={(e) => setAuthor(e.target.value)}></input>
        </div>
        <div>
          <label className='form-label'>text</label>
          <textarea placeholder='Text (optional)' type="text" className='form-control' name="text" onChange={(e) => setText(e.target.value)}></textarea>
        </div>
        <div>
          <Form.Check
            inline
            type="radio"
            name="contentType"
            label="text"
            value="text"
            checked={linkType === 'text'}
            onChange={e => setLinkType(e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            name="contentType"
            label="image"
            value="img"
            checked={linkType === 'img'}
            onChange={e => setLinkType(e.target.value)}
          />
          <Form.Check
            inline
            type="radio"
            name="contentType"
            label="link"
            value="link"
            checked={linkType === 'link'}
            onChange={e => setLinkType(e.target.value)}
          />
        </div>
        <Button variant='success' type="submit" value="Submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm