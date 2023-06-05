import { createSlice } from "@reduxjs/toolkit";
import { useReducer } from "react";



const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    ischanged:false,
  },
  reducers: {
    addItemToCart(state, actions) {
      const newitem = actions.payload;
      const existingitem = state.items.find((item) => item.id === newitem.id);
      state.totalQuantity++
      state.ischanged = true
      if (!existingitem) {
        state.items.push({
          id: newitem.id,
          price: newitem.price,
          quantity: 1,
          totalPrice: newitem.price,
          name: newitem.title,
        });
      }
      else{
        existingitem.quantity++
        existingitem.totalPrice = existingitem.totalPrice + newitem.price
      }
    },
    removeItemFromCart(state,actions){
        const id = actions.payload
        state.ischanged = true
        const existingitem = state.items.find((item)=> item.id === id)
        if(existingitem.quantity === 1){
            state.items = state.items.filter((item)=>item.id !== id)
        }
        else{
            existingitem.quantity--
            existingitem.totalPrice = existingitem.totalPrice - existingitem.price
            state.totalQuantity--
        }
    },
    replaceCart(state,action){
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    }
  },

});




export const cartActions = cartSlice.actions
export default cartSlice