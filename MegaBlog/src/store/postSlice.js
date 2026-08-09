import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        updateStorePost: (state, action) => {
            state.posts = state.posts.map((p) =>
                p.$id === action.payload.$id ? action.payload : p
            );
        },
        deleteStorePost: (state, action) => {
            state.posts = state.posts.filter(
                (p) => p.$id !== action.payload
            );
        },
    }
});

export default postSlice.reducer;
export const { setPosts, addPost, updateStorePost, deleteStorePost } = postSlice.actions;