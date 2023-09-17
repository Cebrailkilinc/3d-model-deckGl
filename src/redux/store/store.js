import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/dataSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})