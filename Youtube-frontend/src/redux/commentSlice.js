import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      if (state.comments) {
        state.comments.push(action.payload);
      } else {
        state.comments = [action.payload];
      }
    },
    editComment: (state, action) => {
      const { commentId, newText } = action.payload;
      const commentIndex = state.comments.findIndex((c) => c._id === commentId);
      if (commentIndex !== -1) {
        state.comments[commentIndex].text = newText;
      }
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
  },
});

export const { setComments, addComment, editComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;















// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   comments: [],
// };

// const commentSlice = createSlice({
//   name: "comment",
//   initialState,
//   reducers: {
//     setComments: (state, action) => {
//       state.comments = action.payload;
//     },
//     addComment: (state, action) => {
//       if (state.comments) {
//         state.comments.push(action.payload);
//       } else {
//         state.comments = [action.payload];
//       }
//     },
//     editComment: (state, action) => {
//       const { commentId, newText } = action.payload;
//       const commentIndex = state.comments.findIndex((c) => c._id === commentId);
//       if (commentIndex !== -1) {
//         state.comments[commentIndex].text = newText;
//       }
//     },
//     deleteComment: (state, action) => {
//       state.comments = state.comments.filter(
//         (comment) => comment._id !== action.payload
//       );
//     },
//   },
// });

// export const { setComments, addComment, editComment, deleteComment } = commentSlice.actions;
// export default commentSlice.reducer;