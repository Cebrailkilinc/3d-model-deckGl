import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openModel: false,
    spinControl:false,
    modalContent:""
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
         },
         handleModalContent:(state,action)=>{
            state.modalContent = action.payload
         },
         openSpin:(state)=>{
            state.spinControl = true
         },
         closeSpin:(state)=>{
            state.spinControl = false
         },
    }
})

export const { openModal,closeModal,handleModalContent,openSpin,closeSpin } = modalSlice.actions
export default modalSlice.reducer