import { createSlice } from "@reduxjs/toolkit";

const initialState={
    username:'',
    firstName:'',
    lastName:'',
    email:'',
    id:'',
    
}
export const uiSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        userRedux:(state,action)=>{
            state.username=action.payload.username
            state.firstName=action.payload.firstName
            state.lastName=action.payload.lastName
            state.email=action.payload.email
            state.id=action.payload.id
        },
        deletRedux:(state,action)=>{
            state.username=""
            state.firstName=""
            state.lastName=""
            state.email=""
            state.id=""
        }

    }
})
export default uiSlice.reducer;
export const {userRedux,deletRedux}=uiSlice.actions