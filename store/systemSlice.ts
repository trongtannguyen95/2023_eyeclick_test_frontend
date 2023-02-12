import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
export interface SystemState {
  alert: boolean;
  alertMessage: string,
}

const initialState: SystemState = {
  alert: false,
  alertMessage: '',
};
export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setAlert(state, action) {
      state.alert = action.payload;
    },
    setAlertMessage(state, action) {
      state.alertMessage = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.system,
      };
    },
  },
});

export const { setAlert ,setAlertMessage} = systemSlice.actions;

export const selectAlert = (state: AppState) => state.system.alert;
export const selectalertMessage = (state: AppState) => state.system.alertMessage;

export default systemSlice.reducer;