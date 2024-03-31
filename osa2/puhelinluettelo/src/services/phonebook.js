import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getAll = () => {
  return axios.get(`${baseUrl}/persons`)
}

const create = async (person) => {
  const request = axios.post(`${baseUrl}/persons`, person)
  return request.then(response => response.data)
}

const update = (person) => {
  return axios.put(`${baseUrl}/persons/${person.id}`, person)
}

const remove = (person) => {
  return axios.delete(`${baseUrl}/persons/${person.id}`)
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove
}