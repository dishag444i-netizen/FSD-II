import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: "",
  media: null,
  platform: "",
  posts: [],
  search: "",
  editingIndex: null,
};


const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {

    setPost: (state, action) => {
      state.post = action.payload;
    },


    setMedia: (state, action) => {
      state.media = action.payload;
    },


    setPlatform: (state, action) => {
      state.platform = action.payload;
    },


    setSearch: (state, action) => {
      state.search = action.payload;
    },


    savePost: (state, action) => {

      if (state.editingIndex !== null) {

        state.posts[state.editingIndex] = action.payload;
        state.editingIndex = null;

      } else {

        state.posts.push(action.payload);

      }

    },


    editPost: (state, action) => {

      const post = state.posts[action.payload];

      state.post = post.post;
      state.media = post.media;
      state.platform = post.platform;
      state.editingIndex = action.payload;

    },


    deletePost: (state, action) => {

      state.posts.splice(action.payload, 1);

    },


    increment: (state) => {

      state.posts.push({

        post: "New Post",

        media: "No File",

        platform: "",

        createdAt: new Date().toLocaleString(),

      });

    },


    decrement: (state) => {

      if (state.posts.length > 0) {
        state.posts.pop();
      }

    },


    clearForm: (state) => {

      state.post = "";
      state.media = null;
      state.platform = "";
      state.editingIndex = null;

    }

  },

});


export const {
  setPost,
  setMedia,
  setPlatform,
  setSearch,
  savePost,
  editPost,
  deletePost,
  increment,
  decrement,
  clearForm,
} = postsSlice.actions;


export default postsSlice.reducer;