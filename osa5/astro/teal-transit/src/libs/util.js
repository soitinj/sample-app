let token = null

export const hostURL = 'http://localhost:3003'

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getConfig = () => ({ headers: { Authorization: token } })

export const chunkArray = (array, chunkSize=20) => {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}
