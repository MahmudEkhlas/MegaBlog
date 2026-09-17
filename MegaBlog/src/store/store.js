import {configureStore} from '@reduxjs/toolkit'
import auth from './authSlice.js'
import post from './postSlice.js'
import theme from './themeSlice.js'

const store = configureStore({
    reducer : {auth, post, theme}
});

export default store;