import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(_state, action) {
      return action.payload
    },
    removeNotification(_state, _action) {
      return ''
    }
  }
})

/*const reducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
  case 'SET_FILTER':
    return action.payload
  default:
    return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}*/

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer