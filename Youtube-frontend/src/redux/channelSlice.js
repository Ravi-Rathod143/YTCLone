import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelId: null,
  channelDetails: null,
  channelVideos: [],
};

const channelSlice = createSlice({
  name: "Channel",
  initialState,
  reducers: {
    setChannelId: (state, action) => {
      state.channelId = action.payload;
    },
    setChannelDetails: (state, action) => {
      state.channelDetails = action.payload;
    },
    setChannelVideos: (state, action) => {
      state.channelVideos = action.payload;
    },
  },
});

export const { setChannelId, setChannelDetails, setChannelVideos } =
  channelSlice.actions;
export default channelSlice.reducer;