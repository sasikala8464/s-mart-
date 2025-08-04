import { createSlice } from "@reduxjs/toolkit";
import { FcAddImage } from "react-icons/fc";

const initialState={
    demo:[],
    cartItems:[]
    
}
export const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        getproductRedux:(state,action)=>{
         state.demo=[...action.payload.products]
         console.log(state.demo)
         
        },
        cartItemRedux:(state,action)=>{
            state.cartItems=[...state.cartItems,{...action.payload,qty:1,total:action.payload.price}]
            console.log(state.cartItems)

        },
        incRedux:(state,action)=>{
          const index=state.cartItems.findIndex((ele)=>{return ele.id===action.payload})
          let data=state.cartItems[index].qty
          state.cartItems[index].qty=++data

          state.cartItems[index].total=data*state.cartItems[index].price 

        },
        decRedux:(state,action)=>{
            const inde=state.cartItems.findIndex((ele)=>{return ele.id===action.payload})
            let data1=state.cartItems[inde].qty
            state.cartItems[inde].qty=--data1

            state.cartItems[inde].total=data1*state.cartItems[inde].price
        },

     
 delredux:(state,action)=>{
const del=state.cartItems.findIndex((ele)=>{return ele.id===action.payload})
state.cartItems.splice(del,1)

 },
 removeFromCart: (state, action) => {
  state.cart = state.cart.filter(item => item.id !== action.payload);
},

    }
})
export default productSlice.reducer;
export const {getproductRedux,cartItemRedux,incRedux,decRedux,delredux,removeFromCart}=productSlice.actions