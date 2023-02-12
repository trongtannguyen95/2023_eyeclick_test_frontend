import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { setCookie } from "../utility/request";
export interface AuthState {
  authState: boolean;
  userProfile: any
}

const initialState: AuthState = {
  authState: false,
  userProfile: null,
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

export const { setAuthState, logout, setUserProfile } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectUserProfile = (state: AppState) => state.auth.userProfile;

export default authSlice.reducer;