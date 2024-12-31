import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Experience } from "../../types/Experience";


const initialState:Experience[]=[]


const experienceSlice = createSlice({
    name:'experience',
    initialState:initialState,
    reducers:{
        addExperience(state,action:PayloadAction<Experience>){
            state.unshift(action.payload)
        },
        removeExperience(state,action:PayloadAction<Experience>){
           return state.filter(exp=>exp !== action.payload);
        }
    }
})

export const {addExperience,removeExperience} = experienceSlice.actions
export default experienceSlice.reducer;