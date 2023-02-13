import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { setCookie } from "../utility/request";
export interface AuthState {
  authState: boolean;
  userProfile: any;
  shoppingCart: any;
}

const initialState: AuthState = {
  authState: false,
  userProfile: null,
  shoppingCart: {}
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    logout(state) {
      state.authState = false
      state.userProfile = null
      setCookie('token', '', 1)
    },
    setShoppingCart(state, action) {
      state.shoppingCart = action.payload
    },
    addItemToShoppingCart(state, action) {
      if (state.shoppingCart[action.payload._id]) {
        state.shoppingCart[action.payload._id]['amount']++
      } else {
        state.shoppingCart[action.payload._id] = {
          ...action.payload, ...{ amount: 1 }
        }
      }
    },
    removeItemFromShoppingCart(state, action) {
      if (state.shoppingCart[action.payload._id] && state.shoppingCart[action.payload._id]['amount'] > 1) {
        state.shoppingCart[action.payload._id]['amount']--
      } else {
        delete state.shoppingCart[action.payload._id]
      }
    },
    deleteItemFromShoppingCart(state, action) {
      if (state.shoppingCart[action.payload._id]) {
        delete state.shoppingCart[action.payload._id]
      }
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setShoppingCart, setAuthState, logout, setUserProfile, addItemToShoppingCart, removeItemFromShoppingCart, deleteItemFromShoppingCart } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectUserProfile = (state: AppState) => state.auth.userProfile;
export const selectShoppingCart = (state: AppState) => state.auth.shoppingCart;

export default authSlice.reducer;