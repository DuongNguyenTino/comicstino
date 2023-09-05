import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
  name: 'History',
  initialState: {
    history: localStorage.getItem('recentlyRead') ? JSON.parse(localStorage.getItem('recentlyRead')) : []
  },
  reducers: {
    addHistory: (state, action) => {
      const filteredHistory = state.history.filter(
        (item) => item.comic_id !== action.payload.comic_id
      )
      if (filteredHistory) {
        state.history = [...filteredHistory, action.payload]
        localStorage.setItem('recentlyRead', JSON.stringify([action.payload, ...filteredHistory]))
      } else {
        state.history = [action.payload]
        localStorage.setItem('recentlyRead', JSON.stringify([action.payload]))
      }
    },
    deleteHistory: (state, action) => {
      const filteredHistory = state.history.filter(
        (item) => item.comic_id !== action.payload
      )
      state.history = filteredHistory
      localStorage.setItem('recentlyRead', JSON.stringify(filteredHistory))
    }
  }
})

export const {
  addHistory,
  deleteHistory
} = historySlice.actions
export default historySlice.reducer