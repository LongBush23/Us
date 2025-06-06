import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: false,
  message: null,
  type: "success",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    // login: (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken;
    // },
    openSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeSnackBar: () => {
      return initialState;
    },
  },
});

export const { openSnackbar, closeSnackBar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
