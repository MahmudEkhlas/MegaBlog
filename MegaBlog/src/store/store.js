import {configureStore} from '@reduxjs/toolkit'
import auth from './authSlice.js'
import post from './postSlice.js'

const store = configureStore({
    reducer : {auth, post}
});

export default store;