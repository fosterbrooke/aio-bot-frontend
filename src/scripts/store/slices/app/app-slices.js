import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const appReducer = createSlice({
    name: 'appReducer',
    initialState: {
        theme:'dark',
        isAuth:null,
        emailVerify:null
    },
    reducers: {

        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setEmailVerify:(state,action)=>{
            state.emailVerify=action.payload
        },
        setIsAuth:(state,action)=>{
            state.isAuth=action.payload
        },
    },
});

export const { setTheme,setEmailVerify,setIsAuth } = appReducer.actions;

export default appReducer.reducer;
