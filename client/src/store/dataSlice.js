

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: true,
  error: {},
};

export const getDatas = createAsyncThunk(
  "/",
  async (_, { rejectWithValue }) => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
 
  extraReducers: {
    [getDatas.pending]: (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    },
    [getDatas.rejected]: (state, { payload }) => {
      state.loading = false;
      state.data = [];
      state.error = payload;
    },
    [getDatas.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export default dataSlice.reducer;


