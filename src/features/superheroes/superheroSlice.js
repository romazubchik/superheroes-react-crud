import axios from 'axios';
import { SUPERHERO_API } from '../../constants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllSuperheroesAPI = createAsyncThunk("syperheroes/getAPI", async() => {
    const apiResponse = await axios.get(`${SUPERHERO_API}/superheroes`);
    return apiResponse.data;
});

export const createNewSuperheroAPI = createAsyncThunk("syperheroes/createAPI", async(payload) => {
    const apiResponse = await axios.post(`${SUPERHERO_API}/superheroes`, payload);
    return apiResponse.data;
});

export const updateSuperheroAPI = createAsyncThunk("syperheroes/updateAPI", async(payload) => {
    const apiResponse = await axios.put(`${SUPERHERO_API}/superheroes/${payload.id}`, payload);
    return apiResponse.data;
});

export const deleteSuperheroAPI = createAsyncThunk("syperheroes/deleteAPI", async(id) => {
    await axios.delete(`${SUPERHERO_API}/superheroes/${id}`);
    return id;
});

const initialState = {
    superheroesData: [], 
    loading: 'idle',
};

const superheroSlice = createSlice({
    name: "superhero",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllSuperheroesAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(fetchAllSuperheroesAPI.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.superheroesData = action.payload;
        });
        builder.addCase(createNewSuperheroAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(createNewSuperheroAPI.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.superheroesData.unshift(action.payload);
        });
        builder.addCase(updateSuperheroAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(updateSuperheroAPI.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.superheroesData = state.superheroesData.filter(_ => _.id !== action.payload.id);
            state.superheroesData.unshift(action.payload);
        });
        builder.addCase(deleteSuperheroAPI.pending, (state, action) => {
            state.loading = "pending";
        });
        builder.addCase(deleteSuperheroAPI.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.superheroesData = state.superheroesData.filter(_ => _.id !== action.payload);
        });
    },
});

export const getAllSuperheroes = (state) => state.superheroes.superheroesData;
export const getLoading = (state) => state.superheroes.loading;
export const getSuperheroesById = (id) => {
    return (state) => state.superheroes.superheroesData.filter((_) => _.id === id)[0];
};

export default superheroSlice.reducer;