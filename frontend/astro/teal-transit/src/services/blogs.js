import axios from 'axios'
import { hostURL, getConfig } from '../libs/util'

const baseUrl = `${hostURL}/api/blogs`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = getConfig()
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (blogId) => {
  const config = getConfig()
  const response = await axios.post(`${baseUrl}/${blogId}/like`, { likes : 1 }, config)
  return response
}

const update = async (blogId, newBlog) => {
  const config = getConfig()
  const response = await axios.post(`${baseUrl}/${blogId}`, newBlog, config)
  return response
}

const remove = async (blogId) => {
  const config = getConfig()
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response
}

export default { getAll, create, like, update, remove }