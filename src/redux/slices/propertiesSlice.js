import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    propertiesValue: [],
}

export const propertiesSlice = createSlice({
    name:"properties",
    initialState,
    reducers:{
        addPropertiesData:(state, action)=>{
           state.propertiesValue=action.payload
        }
    }
})

export const { addPropertiesData } = propertiesSlice.actions
export default propertiesSlice.reducer