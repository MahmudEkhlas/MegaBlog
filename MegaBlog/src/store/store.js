import {configureStore} from '@reduxjs/toolkit'
import auth from './authSlice.js'

const store = configureStore({
    reducer : {auth}
    //add more reducers for posts
});

export default store;