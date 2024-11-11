import axios from 'axios'
import { hostURL } from '../libs/util'

const baseUrl = `${hostURL}/api/feed`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }