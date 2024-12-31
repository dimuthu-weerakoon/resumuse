import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Education } from "../../types/Education";


const intialState:Education[] = []



const educationSlice = createSlice({
    name:'education',
    initialState:intialState,
    reducers:{
        addEducation(state,action:PayloadAction<Education>){
            state.push(action.payload)
        },
        removeEducation(state,action:PayloadAction<Education>){
            return state.filter(edu=>edu !== action.payload)
        },

    }
})

export const {addEducation,removeEducation}=educationSlice.actions

export default educationSlice.reducer