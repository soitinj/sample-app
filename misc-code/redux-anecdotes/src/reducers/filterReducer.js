import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(_state, action) {
      return action.payload
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

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer