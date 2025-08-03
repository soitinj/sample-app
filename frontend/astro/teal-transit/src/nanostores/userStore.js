import { atom } from 'nanostores'
import loginService from '../services/auth'
import { setToken } from '../libs/util'

export const userStore = atom(null)

// Action creators
export const setUser = (user) => {
  userStore.set(user)
}

export const removeUser = () => {
  userStore.set(null)
}

// Async actions
export const logout = () => {
  window.localStorage.clear()
  removeUser()
}

export const login = async (username, password) => {
  const user = await loginService.login({ username, password })
  setToken(user.token)
  window.localStorage.setItem('bloglistUser', JSON.stringify(user))
  setUser(user)
}

export const userFromCache = (cachedUser) => {
  const user = JSON.parse(cachedUser)
  setToken(user.token)
  setUser(user)
}

export default { logout, login, userFromCache }