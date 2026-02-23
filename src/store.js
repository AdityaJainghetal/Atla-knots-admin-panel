// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/Pages/auth/authSlice';
import techReducer from '../src/Pages/technology/techslice/techslice.js';
import technologyReducer from '../src/Pages/TechNews/techSlice/techSlice.js'
import productReducer from "../src/Pages/Home/productSlice/productSlice.js"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tech: techReducer,
   technology: technologyReducer,
   product: productReducer,
    
  },
});