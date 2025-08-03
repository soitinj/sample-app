import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    //console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes&nbsp;
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList