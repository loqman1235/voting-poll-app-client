import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPoll, IPollsState } from "../types";
import api from "../api/api";

const initialState: IPollsState = {
  polls: [],
  isLoading: false,
  error: null,
};

// Fetch Polls Thunk
export const fetchPollsAsync = createAsyncThunk(
  "polls/fetchPolls",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/polls");
      return res.data.polls;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const pollSlice = createSlice({
  name: "polls",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPollsAsync.pending, (state: IPollsState) => {
        state.isLoading = true;
      })
      .addCase(
        fetchPollsAsync.fulfilled,
        (state: IPollsState, action: PayloadAction<IPoll[]>) => {
          state.isLoading = false;
          state.polls = action.payload;
        }
      )
      .addCase(fetchPollsAsync.rejected, (state: IPollsState, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default pollSlice.reducer;
