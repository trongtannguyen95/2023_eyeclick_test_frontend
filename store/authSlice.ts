import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { useRouter } from 'next/router'
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
      const router = useRouter()
      state.authState = false
      state.userProfile = null
      router.push('/')
    }
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState, logout, setUserProfile } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export default authSlice.reducer;