import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const create = async (e) => {
    e.preventDefault()
    const anecdoteStr = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(anecdoteStr))
    dispatch(setNotification(`You created a new anecdote '${anecdoteStr}'`, 5))
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