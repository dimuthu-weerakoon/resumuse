import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./slices/PersonalInfoSlice";


 const Store = configureStore({
    reducer:{
        personalInfo:personalInfoReducer
    }
})

export default Store