import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newAnecdote) => {
  const response = await axios.post(baseUrl, { content: newAnecdote, votes: 0 })
  return response.data
}

const vote = async (anecdote) => {
  const response = await axios.put(baseUrl, anecdote)
}

export default { getAll, create, vote }
