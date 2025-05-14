import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vidId: null,
  searchInput: "",
  allVideos: [],
  videoDetails: [],
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoId: (state, action) => {
      state.vidId = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setAllVideos: (state, action) => {
      // state.allVideos.push(action.payload);
      state.allVideos = action.payload;
    },
    setVideoDetails: (state, action) => {
      state.videoDetails = action.payload;
    },
  },
});

export const { setVideoId, setSearchInput, setAllVideos, setVideoDetails } =
  videoSlice.actions;
export default videoSlice.reducer;