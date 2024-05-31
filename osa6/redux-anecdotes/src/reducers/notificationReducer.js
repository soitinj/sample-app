import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationText(_state, action) {
      return action.payload
    },
    removeNotification(_state, _action) {
      return ''
    }
  }
})

export const { setNotificationText, removeNotification } = notificationSlice.actions

export const setNotification = (notification, timeout) => {
  return async (dispatch) => {
    dispatch(setNotificationText(notification))
    //console.log(`Removing notification after ${timeout} seconds`)
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer