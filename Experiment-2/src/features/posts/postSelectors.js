import { createSelector } from "@reduxjs/toolkit";


export const selectPosts = (state) =>
  state.posts.posts;


export const selectTotalPosts = createSelector(
  [selectPosts],
  (posts) => posts.length
);


export const selectPost = (state) =>
  state.posts.post;


export const selectMedia = (state) =>
  state.posts.media;


export const selectPlatform = (state) =>
  state.posts.platform;


export const selectSearch = (state) =>
  state.posts.search;