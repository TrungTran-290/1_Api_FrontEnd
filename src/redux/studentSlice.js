import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import StudentPage from '../pages/student/StudentPage';

const BASE_URL = 'http://localhost:8080/api/v1/student/pages';

export const getAlll=createAsyncThunk("student/getAll",async ({currentPage,limit},thunkAPI)=>{
    const url=BASE_URL+`?page=${currentPage}&size=${limit}`;
    try{
        const response=await axios.get(url);
        return response.data;
    }
    catch (error){
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
const studentSlice=createSlice({
    name:"student",
    initialState:{
        students:null,
        totalPages:10
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAlll.fulfilled,(state,action)=>{
            state.students=action.payload.data.studentResponseList
            state.totalPages=action.payload.data.totalPages
        });
    }
})
export default studentSlice.reducer