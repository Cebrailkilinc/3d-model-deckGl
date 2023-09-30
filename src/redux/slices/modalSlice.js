import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openModel: true,
}

export const modalSlice = createSlice({
    name:"modalControl",
    initialState,
    reducers:{
        openModal:(state)=>{
           state.openModel = true
        },
        closeModal:(state)=>{
            state.openModel = false
         }
    }
})

export const { openModal,closeModal } = modalSlice.actions
export default modalSlice.reducer