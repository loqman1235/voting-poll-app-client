import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPoll, IPollsState } from "../types";
import api from "../api/api";

const initialState: IPollsState = {
  polls: [],
  totalVotes: [],
  isLoading: false,
  error: null,
};

// Fetch Polls Thunk
export const fetchPollsAsync = createAsyncThunk(
  "polls/fetchPolls",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/polls");
      const polls = res.data.polls;

      const pollsWithPercentages = polls.map((poll: IPoll) => {
        const totalVotes = poll.votes.reduce(
          (total, vote) => (total += vote),
          0
        );
        const percentage = poll.votes.map((vote) => {
          return vote !== 0
            ? Number(((vote * 100) / totalVotes).toFixed(0))
            : 0;
        });

        return { ...poll, percentage };
      });
      return pollsWithPercentages;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const votePollAsync = createAsyncThunk(
  "polls/vote",
  async ({ pollId, option }: { pollId: string; option: string }, thunkAPI) => {
    try {
      const res = await api.post(`/polls/vote`, { pollId, option });

      return res.data.poll;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
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
          state.totalVotes = action.payload.map((poll) => {
            return {
              _id: poll._id,
              total: poll.votes.reduce((acc, vote) => (acc += vote), 0),
            };
          });
        }
      )
      .addCase(fetchPollsAsync.rejected, (state: IPollsState, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(
        votePollAsync.fulfilled,
        (state: IPollsState, action: PayloadAction<IPoll>) => {
          const updatedPoll = action.payload;

          const index = state.polls.findIndex(
            (poll) => poll._id === updatedPoll._id
          );

          if (index !== -1) {
            state.polls[index] = updatedPoll;

            state.totalVotes = state.totalVotes.map((total) => {
              if (total._id === updatedPoll._id) {
                return {
                  _id: total._id,
                  total: total.total + 1,
                };
              }
              return total;
            });
          }
        }
      )
      .addCase(votePollAsync.rejected, (state: IPollsState, action) => {
        console.error("Error voting:", action.payload);
      });
  },
});

export default pollSlice.reducer;
