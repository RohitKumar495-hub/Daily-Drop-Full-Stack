import { createSlice } from '@reduxjs/toolkit'

const initalValue = {
    allCategory : [],
    loadingCategory: false,
    allsubCategory : [],
    product : [] 
}

const productSlice = createSlice({
    name : 'product',
    initialState : initalValue,
    reducers : {
        setAllCategory : (state , action) => {
            state.allCategory = [...action.payload]
        },
        setLoadingCategory : (state , action) => {
            state.loadingCategory = action.payload
        },
        setAllSubCategory : (state,action) => {
            state.allsubCategory = [...action.payload]
        }
    }
})

export const { setAllCategory , setAllSubCategory , setLoadingCategory } = productSlice.actions

export default productSlice.reducer 