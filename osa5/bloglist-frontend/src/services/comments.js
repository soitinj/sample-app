import axios from 'axios'
import { hostURL, getConfig } from '../libs/util'

const baseUrl = `${hostURL}/api/comments`

const get = async (blogId) => {
  const config = getConfig()
  const response = await axios.get(`${baseUrl}/${blogId}`, config)
  return response.data
}

const create = async (comment, blogId) => {
  const config = getConfig()
  const response = await axios.post(`${baseUrl}/${blogId}`, comment, config)
  return response.data
}

const rate = async (commentId, blogId, like) => {
  const config = getConfig()
  const endpoint = like ? 'like' : 'dislike'
  const response = await axios.post(`${baseUrl}/${blogId}/${commentId}/${endpoint}`, {}, config)
  return response.data
}

export default { get, create, rate }
