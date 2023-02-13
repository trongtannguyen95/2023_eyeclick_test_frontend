import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
export interface SystemState {
  alert: boolean;
  alertMessage: string,
  search: string,
}

const initialState: SystemState = {
  alert: false,
  alertMessage: '',
  search: '',
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
    setSearch(state, action) {
      state.search = action.payload;
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

export const { setAlert, setAlertMessage, setSearch } = systemSlice.actions;

export const selectAlert = (state: AppState) => state.system.alert;
export const selectAlertMessage = (state: AppState) => state.system.alertMessage;
export const selectSearch = (state: AppState) => state.system.search;

export default systemSlice.reducer;