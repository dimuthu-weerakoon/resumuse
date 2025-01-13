import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ContactInfo from "../../types/ContactInfo";

const initialState:ContactInfo={
    address: "",
    location: {
        city: "",
        state: "",
        country: ""
    },
    phone: "",
    email: ""
}

const contactInfoSlice  = createSlice({
    name:'contactInfo',
    initialState:initialState,
    reducers:{
        addContactInfo(state,action:PayloadAction<ContactInfo>){
            state.address = action.payload.address
            state.location = action.payload.location
            state.phone = action.payload.phone
            state.email = action.payload.email
        }
    }
})


export const {addContactInfo} = contactInfoSlice.actions

export default contactInfoSlice.reducer