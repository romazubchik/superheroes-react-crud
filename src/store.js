import { configureStore } from "@reduxjs/toolkit";
import superheroes from './features/superheroes/superheroSlice';


export const store = configureStore({
    reducer:{
        superheroes, 
    }
})