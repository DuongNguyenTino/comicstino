import { configureStore } from '@reduxjs/toolkit'
import appStateSlice from './feature/appStateSlice'
import historySlice from './feature/historySlice'

const store = configureStore({
  reducer: {
    appState: appStateSlice,
    history: historySlice
  }
})

export default store