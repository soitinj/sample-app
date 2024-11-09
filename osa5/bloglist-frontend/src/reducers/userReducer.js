import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/auth'
import { setToken } from '../libs/util'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    removeUser(_state, _action) {
      return null
    },
    setUser(_state, action) {
      return action.payload
    }
  }
})

export const { removeUser, setUser } = userSlice.actions

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(removeUser())
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    setToken(user.token)
    window.localStorage.setItem('bloglistUser', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const userFromCache = (cachedUser) => {
  return async (dispatch) => {
    const user = JSON.parse(cachedUser)
    setToken(user.token)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer