import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/dataSlice'
import propertiesReducer from "../slices/propertiesSlice"
import modalSlice from '../slices/modalSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    properties:propertiesReducer,
    modalControl:modalSlice
  },
})