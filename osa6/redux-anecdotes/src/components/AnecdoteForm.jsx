import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const create = async (e) => {
    e.preventDefault()
    const anecdoteStr = e.target.anecdote.value
    e.target.anecdote.value = ''
    const anecdote = await anecdoteService.create(anecdoteStr)
    if (anecdote) {
      dispatch(createAnecdote(anecdote))
      dispatch(setNotification(`You created a new anecdote '${anecdote.content}'`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input required name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm