import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mimariBina: null,
    bagimsizBolum: "",
    balkon: "",
    parsel: "",
    yol: "",
}

export const propertiesSlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
        addMimariBina: (state, action) => {
            state.mimariBina = action.payload
        },
        addBagimsizBolum: (state, action) => {
            state.bagimsizBolum = action.payload
        },
        addBalkon: (state, action) => {
            state.balkon = action.payload
        },
        addParsel: (state, action) => {
            state.parsel = action.payload
        },
        addYol: (state, action) => {
            state.yol = action.payload
        },
    }
})

export const {
    addMimariBina,
    addBagimsizBolum,
    addBalkon,
    addParsel,
    addYol
} = propertiesSlice.actions
export default propertiesSlice.reducer