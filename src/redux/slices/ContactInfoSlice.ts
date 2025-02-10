import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ContactInfo from "../../types/ContactInfo";
// initial state of contact info all props empty
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
//create contact info slice
const contactInfoSlice  = createSlice({
    name:'contactInfo', // slice name
    initialState:initialState, 
    //reducer functions
    reducers:{
        //functions to add contact info 
        //update state to action payload
        addContactInfo(state,action:PayloadAction<ContactInfo>){
            state.address = action.payload.address
            state.location = action.payload.location
            state.phone = action.payload.phone
            state.email = action.payload.email
        }
    }
})

//export slice actions 
export const {addContactInfo} = contactInfoSlice.actions
// export reducer
export default contactInfoSlice.reducer