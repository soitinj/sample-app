let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getConfig = () => ({ headers: { Authorization: token } })
