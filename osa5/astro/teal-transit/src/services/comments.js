import axios from 'axios'
import { getConfig } from '../libs/util'
const baseUrl = '/api/comments'

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

export default { get, create }
