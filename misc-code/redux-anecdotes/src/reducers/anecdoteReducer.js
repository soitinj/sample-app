import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      return state.map(s => s.id === action.payload.id ? action.payload : s)
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const getAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    //console.log('from redux thunk')
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create({ content, votes: 0 })
    //console.log(`created ${newAnecdote.content} from redux-thunk!`)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(updateAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer